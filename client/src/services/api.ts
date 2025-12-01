import axios from "axios";

const api = axios.create({
  // baseURL: "http://45.92.173.159/api",
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
