import React, { useState } from "react";
import { api } from "../../api/api";

export default function AddContainer({ showMessage, setCurrentPage }) {
  const [formData, setFormData] = useState({
    type: "Cup",
    capacity: "500ml",
    pricePerHour: "",
    deposit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.containers.create(formData);
      showMessage("Container added successfully!");
      setCurrentPage("vendor-containers");
    } catch (err) {
      showMessage(err.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Container
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto space-y-4"
      >
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option>Cup</option>
          <option>Bowl</option>
          <option>Box</option>
          <option>Plate</option>
        </select>
        <input
          type="text"
          placeholder="Capacity (e.g., 500ml)"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          placeholder="Price per hour"
          value={formData.pricePerHour}
          onChange={(e) =>
            setFormData({ ...formData, pricePerHour: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          placeholder="Deposit amount"
          value={formData.deposit}
          onChange={(e) =>
            setFormData({ ...formData, deposit: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Container"}
        </button>
      </form>
    </div>
  );
}
