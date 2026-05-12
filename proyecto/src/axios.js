import axios from "axios";

// Crear instancia de axios
const api = axios.create({
  baseURL: "http://localhost:8080", // URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;