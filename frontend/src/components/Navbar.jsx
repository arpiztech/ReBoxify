"use client";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-5">
          ReBoxify
        </Link>

        <div className="d-flex gap-3">
          {!user ? (
            <>
              <Link to="/home" className="nav-link text-white">
                Home
              </Link>
              <Link to="/about" className="nav-link text-white">
                About
              </Link>
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
              <Link to="/register" className="nav-link text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/${user.role}/dashboard`}
                className="nav-link text-white"
              >
                Dashboard
              </Link>
              <Link to="/profile" className="nav-link text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link text-white p-0"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
