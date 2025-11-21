import React from "react";

export default function StatCard({ label, value, color = "green" }) {
  const bg = {
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
  }[color];

  return (
    <div className={`rounded-xl p-6 text-white bg-gradient-to-br ${bg}`}>
      <p className="text-sm opacity-90">{label}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
