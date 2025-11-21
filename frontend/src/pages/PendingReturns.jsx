import { useEffect, useState } from "react";
import api from "../api/api";

const PendingReturns = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/vendor/pending-returns");
        setReturns(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pending Returns</h1>

      {returns.map((r) => (
        <div key={r._id} className="border p-3 rounded mb-2">
          <p>Container: {r.containerId}</p>
          <p>Customer: {r.customerName}</p>
          <p>Due Date: {r.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default PendingReturns;
