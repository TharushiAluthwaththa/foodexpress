import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data.token;
      const user = response.data.user;
      const role = response.data.role || user?.role;

      // ==========================================
      // ADMIN LOGIN
      // ==========================================

      if (role === "admin") {
        // Remove customer login
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_user");

        // Save admin login
        localStorage.setItem("admin_token", token);
        localStorage.setItem(
          "admin_user",
          JSON.stringify(user)
        );

        alert("Admin login successful! 🎉");

        // Go directly to Admin Dashboard
        navigate("/admin/dashboard");

        return;
      }

      // ==========================================
      // CUSTOMER LOGIN
      // ==========================================

      // Remove admin login
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      // Save customer login
      localStorage.setItem(
        "customer_token",
        token
      );

      localStorage.setItem(
        "customer_user",
        JSON.stringify(user)
      );

      alert("Login successful! 🎉");

      // Go to Customer Home
      navigate("/");

      window.location.reload();

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Unable to connect to server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        background:
          "linear-gradient(135deg, #fff8e7, #fff1d6)",
        display: "flex",
        alignItems: "center",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px",
                overflow: "hidden",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ff9f1c, #ff6b35)",
                  color: "white",
                  padding: "35px",
                  textAlign: "center",
                }}
              >

                <div
                  style={{
                    fontSize: "55px",
                  }}
                >
                  🍔
                </div>

                <h2 className="fw-bold mb-1">
                  Welcome Back!
                </h2>

                <p className="mb-0">
                  Login to your FoodExpress account
                </p>

              </div>

              {/* BODY */}

              <div className="card-body p-4 p-md-5">

                {/* ERROR */}

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* EMAIL */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PASSWORD */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading
                      ? "Logging in..."
                      : "🔐 Login"}
                  </button>

                </form>

                {/* REGISTER */}

                <div className="text-center mt-4">

                  <span className="text-muted">
                    Don't have an account?{" "}
                  </span>

                  <Link
                    to="/register"
                    className="fw-bold text-warning text-decoration-none"
                  >
                    Create Account
                  </Link>

                </div>

                {/* BACK TO HOME */}

                <div className="text-center mt-3">

                  <Link
                    to="/"
                    className="text-muted text-decoration-none"
                  >
                    ← Back to Home
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;