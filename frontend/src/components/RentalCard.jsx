const RentalCard = ({ rental }) => {
  const statusBadges = {
    pending: "warning",
    confirmed: "info",
    rented: "success",
    returned: "secondary",
    cancelled: "danger",
  };

  return (
    <div className="card card-custom border-start border-5 border-primary mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title text-gray-900">
              {rental.containerId?.name}
            </h5>
            <p className="card-text text-muted small">
              Rental ID: {rental._id}
            </p>
          </div>
          <span className={`badge bg-${statusBadges[rental.status]}`}>
            {rental.status.toUpperCase()}
          </span>
        </div>

        <div className="row g-2 small">
          <div className="col-6">
            <p className="text-muted mb-1">Start Date</p>
            <p className="fw-semibold">
              {new Date(rental.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="col-6">
            <p className="text-muted mb-1">End Date</p>
            <p className="fw-semibold">
              {new Date(rental.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="col-6">
            <p className="text-muted mb-1">Total Price</p>
            <p className="fw-semibold text-primary">₹{rental.totalPrice}</p>
          </div>
          <div className="col-6">
            <p className="text-muted mb-1">CO2 Saved</p>
            <p className="fw-semibold text-success">{rental.co2Saved} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
