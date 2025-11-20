import React from "react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  color = "green",
}) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} rounded-xl shadow-lg p-6 text-white`}
    >
      {Icon && <Icon size={32} className="mb-3" />}
      <p className="text-sm opacity-90 mb-1">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}
