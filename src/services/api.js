
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Automatically send customer/admin token when available
api.interceptors.request.use(
  (config) => {
    const customerToken =
      localStorage.getItem("customer_token");

    const adminToken =
      localStorage.getItem("admin_token");

    // Admin pages use admin token
    if (window.location.pathname.startsWith("/admin")) {
      if (adminToken) {
        config.headers.Authorization =
          `Bearer ${adminToken}`;
      }
    }

    // Customer pages use customer token
    else {
      if (customerToken) {
        config.headers.Authorization =
          `Bearer ${customerToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
