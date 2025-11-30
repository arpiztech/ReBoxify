"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
ReBoxify;
import toast from "react-hot-toast";

const AdminRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await api.get("/admin/rentals");
      setRentals(data.rentals || []);
    } catch (error) {
      console.log("[v0] Rentals error:", error);
      toast.error("Failed to load rentals");
    } finally {
      setLoading(false);
    }
  };

  const statusBadges = {
    pending: "warning",
    confirmed: "info",
    rented: "success",
    returned: "secondary",
    cancelled: "danger",
  };

  const paymentBadges = {
    pending: "warning",
    completed: "success",
    failed: "danger",
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="fw-bold fs-2 mb-4">All Rentals</h1>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="alert alert-info">No rentals found</div>
        ) : (
          <div className="table-responsive card shadow-sm">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Customer</th>
                  <th>Vendor</th>
                  <th>Container</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental._id}>
                    <td>{rental.customerId?.name}</td>
                    <td>{rental.vendorId?.name}</td>
                    <td>{rental.containerId?.name}</td>
                    <td className="fw-bold">₹{rental.totalPrice}</td>
                    <td>
                      <span
                        className={`badge bg-${statusBadges[rental.status]}`}
                      >
                        {rental.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          paymentBadges[rental.paymentStatus]
                        }`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRentals;
