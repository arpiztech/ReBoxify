import { useEffect, useState } from "react";
import api from "../api/api";

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/customer/rentals");
        setRentals(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Rentals</h1>

      {rentals.map((rent) => (
        <div
          key={rent._id}
          className="p-4 border rounded mb-2 flex justify-between"
        >
          <p>Container ID: {rent.containerId}</p>
          <p>Status: {rent.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRentals;
