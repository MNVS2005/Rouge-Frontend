import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await api.post("/api/auth/login", {
      username,
      password
    });

    const { token, roles } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("roles", JSON.stringify(roles)); // 👈 CLAVE
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("currentUser", username);

    alert("Login correcto ✅");

    // Redirigir según rol
    if (roles.includes("ROLE_ADMIN")) {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {
    if (error.response && error.response.data) {
      alert("Error: " + error.response.data);
    } else {
      alert("Credenciales incorrectas ❌");
    }
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Iniciar sesión</h2>

        <label>Nombre de usuario</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />

        <label>Contraseña</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <p className="auth-link">
          ¿No tienes cuenta? <a href="/register">Regístrate ahora</a>
        </p>

        <div className="auth-actions">
          <button className="btn-primary" onClick={handleLogin}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;