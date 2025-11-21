import { useEffect, useState } from "react";
import api from "../api/api";

const CO2Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/customer/co2-stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  if (!stats) return <p className="p-4">Loading stats...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">CO₂ Savings</h1>

      <p className="text-lg">
        Total CO₂ Saved: <strong>{stats.total} kg</strong>
      </p>

      <h2 className="font-semibold">Breakdown</h2>
      <ul className="list-disc ml-6">
        {stats.monthly.map((m, i) => (
          <li key={i}>
            {m.month}: {m.value} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CO2Stats;
