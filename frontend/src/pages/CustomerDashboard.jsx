import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function CustomerDashboard() {
  const [stats, setStats] = useState({
    active: 0,
    previous: 0,
    co2: 0,
    wallet: 0,
  });

  useEffect(() => {
    // For simplicity, fetch rentals and wallet to compute stats
    Promise.all([API.get("/rentals/my"), API.get("/wallet")])
      .then(([rRes, wRes]) => {
        const rentals = rRes.data;
        const active = rentals.filter((r) => r.status === "active").length;
        const previous = rentals.filter((r) => r.status !== "active").length;
        const co2 = rentals.reduce((s, r) => s + (r.co2SavedKg || 0), 0);
        setStats({
          active,
          previous,
          co2,
          wallet: wRes.data.walletBalance || 0,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Active Rentals</div>
          <div className="text-2xl font-bold">{stats.active}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Previous Rentals</div>
          <div className="text-2xl font-bold">{stats.previous}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">CO₂ Saved (kg)</div>
          <div className="text-2xl font-bold">{stats.co2}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Wallet Balance</div>
          <div className="text-2xl font-bold">₹{stats.wallet}</div>
        </div>
      </div>
    </div>
  );
}
