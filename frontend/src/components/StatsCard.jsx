const StatsCard = ({ title, value, icon, bgColor = "bg-primary" }) => {
  return (
    <div className={`card stats-card ${bgColor} text-white mb-3`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="card-text text-white-50">{title}</p>
            <p className="fs-3 fw-bold mt-2">{value}</p>
          </div>
          <div className="fs-1 opacity-25">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
