import axios from "axios";

/**
 * Axios instance with:
 * - baseURL from .env
 * - Bearer token attachment
 * - auto-logout on 401
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Refresh to force route guard to redirect
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
