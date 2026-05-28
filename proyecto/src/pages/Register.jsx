import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios";
import "../App.css";
import Modal from "../components/Modal";
function Register() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ message: "", type: "" });

  const showModal = (message, type) => {
    setModal({ message, type });
  };
  const closeModal = () => {
    setModal({ message: "", type: "" });
  };
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      showModal("Las contraseñas no coinciden ❌", "error");
      return;
    }

    try {
      const response = await api.post("/api/auth/signup", {
        username,
        email,
        password
      });
      showModal("Usuario registrado ✅\nEn breve recibirás un email de bienvenida.", "success");
      navigate("/login");
    } catch (error) {
  if (error.response && error.response.data) {
    showModal("Error: " + error.response.data, "error");
  } else {
    showModal("Error al registrar usuario", "error");
  }
}
  };

  return (
    
    <div className="auth-page">
        <Modal message={modal.message} type={modal.type} onClose={closeModal} />
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
            onClick={() => navigate("/")}
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