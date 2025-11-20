import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { api } from "../../api/api";

export default function PendingReturns({ showMessage }) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      const data = await api.rentals.getMyRentals();
      setRentals((data.rentals || []).filter((r) => r.status === "ongoing"));
    } catch (err) {
      showMessage(err.message || "Failed", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Returns</h2>
      <div className="space-y-4">
        {rentals.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No pending returns</p>
        ) : (
          rentals.map((rental) => (
            <div key={rental._id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      {rental.container?.type || "Container"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rented: {new Date(rental.rentStartTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  Pending Return
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
