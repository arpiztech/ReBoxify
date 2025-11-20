import React, { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, DollarSign } from "lucide-react";
import StatCard from "../common/statcard";
import { api } from "../../api/api";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    totalContainers: 0,
    rented: 0,
    available: 0,
    earnings: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.stats.getVendorStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Vendor Dashboard
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          label="Total Containers"
          value={stats.totalContainers}
          color="blue"
        />
        <StatCard
          icon={Clock}
          label="Currently Rented"
          value={stats.rented}
          color="orange"
        />
        <StatCard
          icon={CheckCircle}
          label="Available"
          value={stats.available}
          color="green"
        />
        <StatCard
          icon={DollarSign}
          label="Total Earnings"
          value={`₹${stats.earnings}`}
          color="purple"
        />
      </div>
    </div>
  );
}
