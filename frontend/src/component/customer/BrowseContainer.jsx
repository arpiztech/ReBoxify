import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { api } from "../../api/api";

export default function BrowseContainers({ showMessage, setCurrentPage }) {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContainers();
  }, []);

  const loadContainers = async () => {
    try {
      const data = await api.containers.getAll();
      setContainers(data.containers || []);
    } catch (err) {
      showMessage(err.message || "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (containerId) => {
    try {
      await api.rentals.create({ containerId });
      showMessage("Container rented successfully!");
      loadContainers();
      setCurrentPage("my-rentals");
    } catch (err) {
      showMessage(err.message || "Rent failed", "error");
    }
  };

  if (loading)
    return <div className="text-center py-12">Loading containers...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Available Containers
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {containers.map((container) => (
          <div
            key={container._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{container.type}</h3>
                <p className="text-sm text-gray-500">{container.capacity}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price/hour:</span>
                <span className="font-semibold">₹{container.pricePerHour}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Deposit:</span>
                <span className="font-semibold">₹{container.deposit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">CO₂ Saved:</span>
                <span className="font-semibold text-green-600">0.3 kg</span>
              </div>
            </div>
            <button
              onClick={() => handleRent(container._id)}
              disabled={container.status !== "available"}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {container.status === "available" ? "Rent Now" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
