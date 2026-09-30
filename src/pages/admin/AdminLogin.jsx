import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../../services/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await api.post(
        "/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "admin_token",
        response.data.token
      );

      localStorage.setItem(
        "admin_user",
        JSON.stringify(response.data.user)
      );

      navigate("/admin/dashboard");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Invalid admin email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          🍔
        </div>

        <h2>
          FoodExpress
        </h2>

        <h4>
          Admin Login
        </h4>

        <p className="admin-login-subtitle">
          Login to manage your FoodExpress system
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label">
              Admin Email
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-bold"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "🔐 Login as Admin"}
          </button>

        </form>

        <div className="admin-login-footer">

          <p>
            Are you a customer?
          </p>

          <Link
            to="/login"
            className="btn btn-outline-dark w-100"
          >
            Customer Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;