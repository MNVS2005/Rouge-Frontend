import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "../App.css";

function Admin() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Validar acceso
  useEffect(() => {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles"));

    if (!token || !roles?.includes("ROLE_ADMIN")) {
      navigate("/login");
      return;
    }

    fetchActivities();
  }, [navigate]);

  // 📊 Obtener actividad
  const fetchActivities = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/admin/activity");
      setActivities(response.data);
    } catch (err) {
      console.error(err);
      setError("Error cargando actividad");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Panel de Administración 🛠️</h1>
        <div>
          <button onClick={fetchActivities} className="btn-secondary">
            🔄 Refrescar
          </button>
          <button onClick={handleLogout} className="btn-danger">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ESTADOS */}
      {loading && <p>Cargando actividad...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLA */}
      {!loading && activities.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((act, index) => (
              <tr key={index}>
                <td>{act.username}</td>
                <td>{act.action}</td>
                <td>
                  {new Date(act.timestamp).toLocaleString()}
                </td>
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
      )}

      {!loading && activities.length === 0 && (
        <p>No hay actividad registrada.</p>
      )}
    </div>
  );
}

export default Admin;