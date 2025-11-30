"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const VendorContainers = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    try {
      const data = await api.get("/vendor/containers");
      setContainers(data.containers);
    } catch (error) {
      toast.error("Failed to load containers");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (container) => {
    setEditingId(container._id);
    setEditData({
      available: container.available,
      pricePerDay: container.pricePerDay,
      isActive: container.isActive,
    });
  };

  const handleSave = async (id) => {
    try {
      await api.patch(`/vendor/container/${id}`, editData);
      toast.success("Container updated");
      fetchContainers();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update container");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Containers</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : containers.length === 0 ? (
          <p className="text-center text-gray-600">No containers found</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Price/Day
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container) => (
                  <tr key={container._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{container.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {container.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === container._id ? (
                        <input
                          type="number"
                          value={editData.available}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              available: Number.parseInt(e.target.value),
                            })
                          }
                          className="px-2 py-1 border rounded"
                        />
                      ) : (
                        container.available
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === container._id ? (
                        <input
                          type="number"
                          value={editData.pricePerDay}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              pricePerDay: Number.parseFloat(e.target.value),
                            })
                          }
                          className="px-2 py-1 border rounded w-24"
                        />
                      ) : (
                        `₹${container.pricePerDay}`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          container.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {container.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === container._id ? (
                        <>
                          <button
                            onClick={() => handleSave(container._id)}
                            className="text-green-600 hover:text-green-800 mr-4"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(container)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      )}
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

export default VendorContainers;
