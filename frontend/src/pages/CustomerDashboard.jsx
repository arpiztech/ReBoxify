import { useEffect, useState } from "react";
import api from "../api/api";

const CustomerDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/customer/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadStats();
  }, []);

  if (!stats) return <p className="text-center p-4">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="font-semibold">Active Rentals</h2>
          <p className="text-xl">{stats.activeRentals}</p>
        </div>

        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="font-semibold">CO₂ Saved</h2>
          <p className="text-xl">{stats.co2Saved} kg</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
