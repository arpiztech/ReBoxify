import { Link } from "react-router-dom";

const ContainerCard = ({ container }) => {
  return (
    <div className="card card-custom h-100">
      <div
        className="bg-gradient text-white d-flex align-items-center justify-content-center"
        style={{ height: "160px" }}
      >
        <span className="fs-1">📦</span>
      </div>
      <div className="card-body">
        <h5 className="card-title text-gray-900">{container.name}</h5>
        <p className="card-text text-muted small">{container.description}</p>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-primary">
            ₹{container.pricePerDay}/day
          </span>
          <span
            className={`badge ${
              container.available > 0 ? "bg-success" : "bg-danger"
            }`}
          >
            {container.available > 0 ? "Available" : "Out of Stock"}
          </span>
        </div>
        <Link
          to={`/container/${container._id}`}
          className="btn btn-primary w-100 mt-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ContainerCard;
