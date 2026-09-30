
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/register",
        form
      );

      localStorage.setItem(
        "customer_token",
        response.data.token
      );

      localStorage.setItem(
        "customer_user",
        JSON.stringify(response.data.user)
      );

      alert("Registration successful! 🎉");

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        const firstError =
          Object.values(errors)?.[0]?.[0];

        setError(
          firstError || "Registration failed."
        );
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Unable to connect to server."
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
          "linear-gradient(135deg,#fff8e7,#fff1d6)",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg,#ff9f1c,#ff6b35)",
                  color: "white",
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "50px" }}>
                  🍔
                </div>

                <h2 className="fw-bold">
                  Create Account
                </h2>

                <p className="mb-0">
                  Join FoodExpress today!
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Minimum 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="password_confirmation"
                      className="form-control form-control-lg"
                      placeholder="Re-enter password"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Account..."
                      : "🚀 Create Account"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?{" "}
                  </span>

                  <Link
                    to="/login"
                    className="fw-bold text-warning text-decoration-none"
                  >
                    Login
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

export default Register;
