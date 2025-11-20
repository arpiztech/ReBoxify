import React, { useState, useEffect } from "react";
import { Leaf, Package } from "lucide-react";
import { api } from "../../api/api";

export default function CO2Stats() {
  const [stats, setStats] = useState({ totalCO2Saved: 0, containersUsed: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.stats.getCO2Stats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Environmental Impact
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white">
          <Leaf size={40} className="mb-4" />
          <p className="text-green-100 mb-2">Total CO₂ Saved</p>
          <h3 className="text-4xl font-bold">
            {(stats.totalCO2Saved || 0).toFixed(2)} kg
          </h3>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <Package size={40} className="mb-4" />
          <p className="text-blue-100 mb-2">Containers Used</p>
          <h3 className="text-4xl font-bold">{stats.containersUsed || 0}</h3>
        </div>
      </div>
    </div>
  );
}
