"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⭐ Dummy Registration – No Backend Required
      localStorage.setItem("user", JSON.stringify(formData));

      toast.success("Registration successful!");

      // ⭐ Redirect Role According
      if (formData.role === "customer") {
        navigate("/customer/dashboard");
      } else if (formData.role === "vendor") {
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center fw-bold mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">
                Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="+91"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-muted mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary fw-bold text-decoration-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⭐ Dummy Registration – No Backend Required
      localStorage.setItem("user", JSON.stringify(formData));

      toast.success("Registration successful!");

      // ⭐ Redirect Role According
      if (formData.role === "customer") {
        navigate("/customer/dashboard");
      } else if (formData.role === "vendor") {
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center fw-bold mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">
                Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="+91"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-muted mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary fw-bold text-decoration-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
export default Register;
export default Register;
export default Register;
export default Register;

