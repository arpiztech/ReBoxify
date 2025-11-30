"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ContainerCard from "../../components/ContainerCard";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const BrowseContainers = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", priceMax: "" });

  useEffect(() => {
    fetchContainers();
  }, [filters]);

  const fetchContainers = async () => {
    try {
      const data = await api.get("/customer/containers", { params: filters });
      setContainers(data.containers);
    } catch (error) {
      toast.error("Failed to load containers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Browse Containers
        </h1>

        <div className="mb-8 flex gap-4">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="">All Categories</option>
            <option value="plastic">Plastic</option>
            <option value="glass">Glass</option>
            <option value="metal">Metal</option>
            <option value="mixed">Mixed</option>
          </select>

          <input
            type="number"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : containers.length === 0 ? (
          <p className="text-center text-gray-600">No containers found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {containers.map((container) => (
              <ContainerCard key={container._id} container={container} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseContainers;
