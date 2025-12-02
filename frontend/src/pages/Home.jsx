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
            Rent reusable containers. Reduce plastic waste
          </h1>
          <p
            className="lead text-muted mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            ReBoxify helps reduce environmental impact with reusable containers.
            Join thousands of eco-conscious businesses and individuals.
          </p>

          {/* If logged in → show Dashboard button */}
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
            /* If not logged in → show Login + Register buttons */
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/login" className="btn btn-primary btn-lg">
                Get Started
              </Link>

              <Link to="/register" className="btn btn-outline-primary btn-lg">
                Learn More
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fs-3 fw-bold mb-5">
            Why Choose ReBoxify?
          </h2>

          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">🌱</div>
              <h5 className="fw-bold">Eco-Friendly</h5>
              <p className="text-muted">
                Reduce carbon footprint using reusable containers.
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">💰</div>
              <h5 className="fw-bold">Cost Effective</h5>
              <p className="text-muted">
                Affordable rental prices for businesses of all sizes.
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div className="fs-1 mb-3">🤝</div>
              <h5 className="fw-bold">Community Driven</h5>
              <p className="text-muted">
                Connect with vendors and eco-friendly customers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
