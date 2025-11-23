import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    API.get("/rentals/my")
      .then((res) => setRentals(res.data))
      .catch(console.error);
  }, []);

  const requestReturn = async (id) => {
    if (!confirm("Request return?")) return;
    try {
      await API.post("/rentals/request-return", { rentalId: id });
      alert("Return requested");
      setRentals(
        rentals.map((r) =>
          r._id === id ? { ...r, status: "requested_return" } : r
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-3">My Rentals</h2>
      <div className="space-y-4">
        {rentals.map((r) => (
          <div key={r._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{r.container?.title}</div>
                <div>
                  From: {new Date(r.startDate).toLocaleDateString()} To:{" "}
                  {new Date(r.endDate).toLocaleDateString()}
                </div>
                <div>
                  Status: <strong>{r.status}</strong>
                </div>
                <div>
                  Amount: ₹{r.totalAmount} | Deposit: ₹{r.depositPaid}
                </div>
                <div>CO₂ Saved: {r.co2SavedKg} kg</div>
              </div>
              <div className="flex flex-col gap-2">
                {r.status === "active" && (
                  <button
                    onClick={() => requestReturn(r._id)}
                    className="p-2 bg-yellow-500 rounded"
                  >
                    Request Return
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
