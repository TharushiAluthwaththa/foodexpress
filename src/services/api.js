
import axios from "axios";
import { Capacitor } from "@capacitor/core";

const apiBaseURL = Capacitor.isNativePlatform()
  ? "http://10.0.2.2:8000/api"
  : "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

export default api;
