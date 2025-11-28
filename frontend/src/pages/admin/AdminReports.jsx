"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await api.get("/admin/reports");
      setReport(data.report);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Platform Reports
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : report ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Total Users"
                value={report.totalUsers}
                icon="👥"
                bgColor="bg-blue-500"
              />
              <StatsCard
                title="Total Vendors"
                value={report.totalVendors}
                icon="🏢"
                bgColor="bg-purple-500"
              />
              <StatsCard
                title="Total Rentals"
                value={report.totalRentals}
                icon="🔄"
                bgColor="bg-yellow-500"
              />
              <StatsCard
                title="Completed Rentals"
                value={report.completedRentals}
                icon="✓"
                bgColor="bg-green-500"
              />
              <StatsCard
                title="CO2 Saved (kg)"
                value={report.totalCO2Saved}
                icon="🌱"
                bgColor="bg-emerald-500"
              />
              <StatsCard
                title="Total Revenue"
                value={`₹${report.totalRevenue}`}
                icon="💰"
                bgColor="bg-indigo-500"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Completion Rate:</strong>{" "}
                  {report.totalRentals > 0
                    ? (
                        (report.completedRentals / report.totalRentals) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </li>
                <li>
                  <strong>Average Revenue per Rental:</strong> ₹
                  {report.totalRentals > 0
                    ? (report.totalRevenue / report.totalRentals).toFixed(2)
                    : 0}
                </li>
                <li>
                  <strong>Avg CO2 Saved per User:</strong>{" "}
                  {report.totalUsers > 0
                    ? (report.totalCO2Saved / report.totalUsers).toFixed(2)
                    : 0}{" "}
                  kg
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No reports available</p>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
