import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { api } from "../../api/api";

export default function VendorContainers({ showMessage }) {
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
      showMessage(err.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Containers</h2>
      <div className="space-y-4">
        {containers.map((container) => (
          <div
            key={container._id}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  container.status === "available"
                    ? "bg-green-100"
                    : "bg-orange-100"
                }`}
              >
                <Package
                  className={
                    container.status === "available"
                      ? "text-green-600"
                      : "text-orange-600"
                  }
                  size={24}
                />
              </div>
              <div>
                <h3 className="font-bold">{container.type}</h3>
                <p className="text-sm text-gray-500">
                  {container.capacity} | ₹{container.pricePerHour}/hr
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                container.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {container.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
