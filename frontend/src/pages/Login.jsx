"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      // FRONTEND MOCK LOGIN (Replace with backend call later)
      if (login) {
        // If useAuth login is ready, call it
        res = await login(email, password);
      } else {
        // Temporary mock response for frontend testing
        res = {
          token: "dummy-token",
          user: { name: "Test User", role: "customer", email },
        };
      }

      // SAVE TOKEN + USER IN LOCALSTORAGE
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      toast.success("Login successful!");

      // ROLE BASED REDIRECT
      if (res?.user?.role === "customer") {
        navigate("/customer/dashboard");
      } else if (res?.user?.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center fw-bold mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3 text-muted small">
            Don't have an account?{" "}
            <Link to="/register" className="fw-bold text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
