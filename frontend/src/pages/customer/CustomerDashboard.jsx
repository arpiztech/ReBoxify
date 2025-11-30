"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
ReBoxify;
import toast from "react-hot-toast";

const CustomerDashboard = () => {
  const [stats, setStats] = useState({
    activeRentals: 0,
    totalCO2: 0,
    walletBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [rentalsRes, co2Res, walletRes] = await Promise.all([
        api.get("/customer/rentals"),
        api.get("/customer/co2-stats"),
        api.get("/customer/wallet"),
      ]);

      const activeRentals = rentalsRes.rentals.filter(
        (r) => r.status === "rented"
      ).length;

      setStats({
        activeRentals,
        totalCO2: co2Res.stats.totalCO2Saved,
        walletBalance: walletRes.wallet.balance,
      });
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
          Customer Dashboard
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
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
