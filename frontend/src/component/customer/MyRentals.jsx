import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { api } from "../../api/api";

export default function MyRentals({ showMessage }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      const data = await api.rentals.getMyRentals();
      setRentals(data.rentals || []);
    } catch (err) {
      showMessage(err.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      await api.rentals.returnContainer(rentalId, { condition: "good" });
      showMessage("Container returned successfully!");
      loadRentals();
    } catch (err) {
      showMessage(err.message || "Return failed", "error");
    }
  };

  if (loading)
    return <div className="text-center py-12">Loading rentals...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Rentals</h2>
      <div className="space-y-4">
        {rentals.map((rental) => (
          <div key={rental._id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">
                    {rental.container?.type || "Container"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Started: {new Date(rental.rentStartTime).toLocaleString()}
                  </p>
                  {rental.status === "ongoing" && (
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      Currently Rented
                    </p>
                  )}
                  {rental.status === "completed" && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Returned
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                {rental.status === "ongoing" ? (
                  <button
                    onClick={() => handleReturn(rental._id)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Return
                  </button>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold">
                      ₹{rental.totalAmount || 0}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
