"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import RentalCard from "../../components/RentalCard";
import api from "../../utils/api";
import toast from "react-hot-toast";

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await api.get("/customer/rentals");
      setRentals(data.rentals);
    } catch (error) {
      toast.error("Failed to load rentals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Rentals</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : rentals.length === 0 ? (
          <p className="text-center text-gray-600">No rentals found</p>
        ) : (
          <div className="space-y-4">
            {rentals.map((rental) => (
              <RentalCard key={rental._id} rental={rental} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
