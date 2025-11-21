import { useEffect, useState } from "react";
import api from "../api/api";

const VendorDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/vendor/stats");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  if (!data) return <p className="p-4">Loading vendor dashboard...</p>;

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-semibold">Total Containers</h2>
          <p className="text-xl">{data.totalContainers}</p>
        </div>

        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold">Active Rentals</h2>
          <p className="text-xl">{data.activeRentals}</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
