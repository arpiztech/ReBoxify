"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import api from "../../utils/api";
import toast from "react-hot-toast";

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    totalContainers: 0,
    totalRentals: 0,
    activeRentals: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.get("/vendor/dashboard");
      setStats(data.stats);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Vendor Dashboard
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Containers"
              value={stats.totalContainers}
              icon="📦"
              bgColor="bg-blue-500"
            />
            <StatsCard
              title="Total Rentals"
              value={stats.totalRentals}
              icon="🔄"
              bgColor="bg-yellow-500"
            />
            <StatsCard
              title="Active Rentals"
              value={stats.activeRentals}
              icon="✓"
              bgColor="bg-green-500"
            />
            <StatsCard
              title="Revenue"
              value={`₹${stats.totalRevenue}`}
              icon="💰"
              bgColor="bg-purple-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
