import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RentContainer() {
  const { id } = useParams();
  const [container, setContainer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const nav = useNavigate();
  const { user, refreshProfile } = React.useContext(AuthContext);

  useEffect(() => {
    API.get(`/containers/${id}`)
      .then((res) => setContainer(res.data))
      .catch(() => alert("Container not found"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/rentals/rent", {
        containerId: id,
        startDate,
        endDate,
      });
      alert("Rented successfully");
      await refreshProfile();
      nav("/rentals");
    } catch (err) {
      alert(err.response?.data?.message || "Rent failed");
    }
  };

  if (!container) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded">
      <h2 className="text-xl font-semibold mb-3">Rent {container.title}</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label>Start</label>
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label>End</label>
          <input
            required
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <small>
            Price/day: ₹{container.rentalPricePerDay} | Deposit: ₹
            {container.deposit}
          </small>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded">
          Confirm & Pay (Dummy)
        </button>
      </form>
    </div>
  );
}
