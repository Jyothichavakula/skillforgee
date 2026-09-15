import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every authenticated request
api.interceptors.request.use(
  (config) => {
    const accessToken =
      store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;