"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import toast from "react-hot-toast";

const CustomerDashboard = () => {
  const [stats, setStats] = useState({
    activeRentals: 0,
    totalCO2: 0,
    walletBalance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dummy data because backend not connected
    loadDummyData();
  }, []);

  const loadDummyData = () => {
    setLoading(true);

    setTimeout(() => {
      setStats({
        activeRentals: 2,
        totalCO2: 12.8,
        walletBalance: 450,
      });

      toast.success("Dashboard Loaded!");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Customer Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Active Rentals"
              value={stats.activeRentals}
              icon="📦"
              bgColor="bg-blue-500"
            />

            <StatsCard
              title="CO2 Saved (kg)"
              value={stats.totalCO2}
              icon="🌱"
              bgColor="bg-green-500"
            />

            <StatsCard
              title="Wallet Balance"
              value={`₹${stats.walletBalance}`}
              icon="💰"
              bgColor="bg-purple-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
