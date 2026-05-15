import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "../App.css";

const PAGE_SIZE_OPTIONS = [25, 50, 100];

function Admin() {
  const navigate = useNavigate();

  // Actividad
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Filtros
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Ordenación
  const [sortField, setSortField] = useState("timestamp");
  const [sortDir, setSortDir] = useState("desc");

  // Upload / descarga
  const [gameFile, setGameFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔐 Validar acceso
  useEffect(() => {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles") || "null");

    if (!token || !roles?.includes("ROLE_ADMIN")) {
      navigate("/login");
      return;
    }

    fetchActivities();
    fetchGameStatus();
  }, [navigate]);

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, pageSize]);

  // 📊 Obtener actividad
  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError("");
    const controller = new AbortController();
    try {
      const response = await api.get("/api/admin/activity", {
        signal: controller.signal,
      });
      setActivities(response.data ?? []);
      setCurrentPage(1);
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.error(err);
        setError("Error cargando actividad. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, []);

  // 📦 Comprobar si hay archivo de descarga
  const fetchGameStatus = async () => {
    try {
      const res = await api.get("/api/download/status");
      setUploadStatus(res.data);
    } catch (err) {
      console.error("Error al comprobar el archivo:", err);
    }
  };

  // ⬆️ Subir archivo
  const handleUpload = async () => {
    if (!gameFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", gameFile);
      await api.post("/api/download/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Archivo subido correctamente");
      setGameFile(null);
      fetchGameStatus();
    } catch (err) {
      console.error(err);
      alert("❌ Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  // 🗑️ Eliminar archivo
  const handleDeleteGame = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar el archivo de descarga?")) return;
    try {
      await api.delete("/api/download/game");
      alert("🗑️ Archivo eliminado");
      fetchGameStatus();
    } catch (err) {
      alert("Error al eliminar el archivo");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🔍 Filtrado
  const filtered = useMemo(() => {
    let result = activities;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (act) =>
          act.username?.toLowerCase().includes(q) ||
          act.action?.toLowerCase().includes(q)
      );
    }
    if (filterStatus === "online") result = result.filter((act) => act.logged);
    else if (filterStatus === "guest") result = result.filter((act) => !act.logged);
    return result;
  }, [activities, search, filterStatus]);

  // ↕️ Ordenación
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === "timestamp") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else {
        valA = (valA ?? "").toString().toLowerCase();
        valB = (valB ?? "").toString().toLowerCase();
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortDir]);

  // 📄 Paginación
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const sortIcon = (field) => {
    if (sortField !== field) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="admin-container">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Panel de Administración 🛠️</h1>
        <div>
          <button onClick={fetchActivities} className="btn-secondary" disabled={loading}>
            🔄 Refrescar
          </button>
          <button onClick={handleLogout} className="btn-danger">
            🚪 Logout
          </button>
        </div>
      </div>


      {/* ESTADOS */}
      {loading && <p className="admin-status">Cargando actividad…</p>}
      {error && <p className="admin-status admin-error">{error}</p>}

      {/* CONTROLES DE FILTRO */}
      {!loading && activities.length > 0 && (
        <div className="admin-controls">
          <input
            className="admin-search"
            type="text"
            placeholder="🔍 Buscar por usuario o acción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="online">🟢 Online</option>
            <option value="guest">🔴 Invitado</option>
          </select>
          <select
            className="admin-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
          <span className="admin-count">
            {sorted.length} resultado{sorted.length !== 1 ? "s" : ""}
            {activities.length !== sorted.length && ` de ${activities.length}`}
          </span>
        </div>
      )}

      {/* TABLA */}
      {!loading && paginated.length > 0 && (
        <>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("username")} className="sortable">
                    Usuario{sortIcon("username")}
                  </th>
                  <th onClick={() => handleSort("action")} className="sortable">
                    Acción{sortIcon("action")}
                  </th>
                  <th onClick={() => handleSort("timestamp")} className="sortable">
                    Fecha{sortIcon("timestamp")}
                  </th>
                  <th onClick={() => handleSort("logged")} className="sortable">
                    Estado{sortIcon("logged")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((act, index) => (
                  <tr key={act.id ?? `${act.username}-${act.timestamp}-${index}`}>
                    <td>{act.username}</td>
                    <td>{act.action}</td>
                    <td>{new Date(act.timestamp).toLocaleString()}</td>
                    <td>
                      {act.logged ? (
                        <span className="status online">🟢 Online</span>
                      ) : (
                        <span className="status offline">🔴 Invitado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINACIÓN */}
          <div className="admin-pagination">
            <button className="btn-secondary" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
            <button className="btn-secondary" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
            <span className="page-info">
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>
            <button className="btn-secondary" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
            <button className="btn-secondary" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
          </div>
        </>
      )}

      {!loading && !error && activities.length === 0 && (
        <p>No hay actividad registrada.</p>
      )}
      {!loading && !error && activities.length > 0 && sorted.length === 0 && (
        <p>No hay resultados para los filtros actuales.</p>
      )}
    </div>
  );
}

export default Admin;