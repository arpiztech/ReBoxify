"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContainers: 0,
    totalRentals: 0,
    totalCO2Saved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.get("/admin/dashboard");
      setStats(data.dashboard || {});
    } catch (error) {
      console.log("[v0] Admin dashboard error:", error);
      toast.error("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="fw-bold fs-2 mb-4">Admin Dashboard</h1>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <StatsCard
                title="Total Users"
                value={stats.totalUsers || 0}
                icon="👥"
                bgColor="bg-primary"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatsCard
                title="Total Containers"
                value={stats.totalContainers || 0}
                icon="📦"
                bgColor="bg-success"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatsCard
                title="Total Rentals"
                value={stats.totalRentals || 0}
                icon="🔄"
                bgColor="bg-info"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatsCard
                title="CO2 Saved (kg)"
                value={stats.totalCO2Saved || 0}
                icon="🌱"
                bgColor="bg-warning"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
