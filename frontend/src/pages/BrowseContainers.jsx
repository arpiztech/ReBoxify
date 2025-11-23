import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function BrowseContainers() {
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    API.get("/containers")
      .then((res) => setContainers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Available Containers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {containers.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow">
            <img
              src={c.image || "https://via.placeholder.com/300x150"}
              alt={c.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{c.title}</h3>
            <p className="text-sm">{c.description}</p>
            <div className="mt-2">
              <div>Price/day: ₹{c.rentalPricePerDay}</div>
              <div>Deposit: ₹{c.deposit}</div>
              <div>Available: {c.availableQty}</div>
            </div>
            <Link
              to={`/rent/${c._id}`}
              className="mt-3 inline-block bg-green-600 text-white p-2 rounded"
            >
              Rent
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
