import axios from "axios";

// Crear instancia de axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL de tu backend
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