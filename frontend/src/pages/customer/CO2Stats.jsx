"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const CO2Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.get("/customer/co2-stats");
      setStats(data.stats);
    } catch (error) {
      toast.error("Failed to load CO2 stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Your Environmental Impact
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title="Total CO2 Saved (kg)"
              value={stats.totalCO2Saved}
              icon="🌱"
              bgColor="bg-green-500"
            />
            <StatsCard
              title="Rentals Count"
              value={stats.rentalsCount}
              icon="📦"
              bgColor="bg-blue-500"
            />
            <StatsCard
              title="Eco Score"
              value={stats.ecoScore}
              icon="🏆"
              bgColor="bg-yellow-500"
            />
            <StatsCard
              title="Avg Savings per Rental"
              value={`${stats.averageSavingsPerRental} kg`}
              icon="📊"
              bgColor="bg-purple-500"
            />
          </div>
        ) : (
          <p className="text-center text-gray-600">No stats available</p>
        )}
      </div>
    </div>
  );
};

export default CO2Stats;
