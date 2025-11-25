"use client";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Sustainable Container Rentals
          </h1>
          <p
            className="lead text-muted mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            ECOrent helps reduce environmental impact by promoting reusable
            containers. Join thousands of eco-conscious businesses and
            individuals.
          </p>

          {user ? (
            <div className="d-flex gap-2 justify-content-center">
              <Link
                to={`/${user.role}/dashboard`}
                className="btn btn-primary btn-lg"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-primary btn-lg">
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fs-3 fw-bold mb-5">Why Choose ECOrent?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">🌱</div>
              <h5 className="fw-bold">Eco-Friendly</h5>
              <p className="text-muted">
                Reduce carbon footprint with reusable containers
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">💰</div>
              <h5 className="fw-bold">Cost Effective</h5>
              <p className="text-muted">
                Affordable rental prices for businesses of all sizes
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">🤝</div>
              <h5 className="fw-bold">Community Driven</h5>
              <p className="text-muted">
                Connect with vendors and fellow eco-warriors
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
