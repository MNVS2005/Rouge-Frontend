import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    try {
      const response = await api.post("/api/auth/signup", {
        username,
        email,
        password
      });
      alert("Usuario registrado ✅");
      navigate("/login");
    } catch (error) {
  if (error.response && error.response.data) {
    alert("Error: " + error.response.data);
  } else {
    alert("Error al registrar usuario ❌");
  }
}
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Registrarse</h2>
        <label>Nombre de usuario</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />

        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <label>Confirmar contraseña</label>
        <input type="password" onChange={(e) => setConfirm(e.target.value)} />

        <div className="auth-actions">
          <button
            className="btn-cancel"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>

          <button className="btn-primary" onClick={handleRegister}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;