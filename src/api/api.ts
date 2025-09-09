import axios from "axios";

const api = axios.create({
  baseURL: "https://api.onnbit.com/api/admin", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (add token automatically)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
