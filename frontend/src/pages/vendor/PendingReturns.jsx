"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../utils/api";
import toast from "react-hot-toast";

const PendingReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingReturns();
  }, []);

  const fetchPendingReturns = async () => {
    try {
      const data = await api.get("/vendor/returns");
      setReturns(data.returns);
    } catch (error) {
      toast.error("Failed to load pending returns");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`/vendor/return/${id}/approve`);
      toast.success("Return approved");
      fetchPendingReturns();
    } catch (error) {
      toast.error("Failed to approve return");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;

    try {
      await api.patch(`/vendor/return/${id}/reject`, { reason });
      toast.success("Return rejected");
      fetchPendingReturns();
    } catch (error) {
      toast.error("Failed to reject return");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Pending Returns
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : returns.length === 0 ? (
          <p className="text-center text-gray-600">No pending returns</p>
        ) : (
          <div className="space-y-4">
            {returns.map((ret) => (
              <div key={ret._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {ret.customerId?.name} - {ret.rentalId?.containerId?.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Reason: {ret.reason}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                    {ret.status}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(ret._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(ret._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingReturns;
