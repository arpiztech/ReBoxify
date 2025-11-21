import React from "react";

export default function ContainerCard({ item, onRent }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-100 p-3 rounded-md" />
        <div>
          <h3 className="font-semibold">{item.type}</h3>
          <p className="text-xs text-slate-500">{item.capacity}</p>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Price / hr</span>
          <span className="font-semibold">₹{item.pricePerHour}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Deposit</span>
          <span className="font-semibold">₹{item.deposit}</span>
        </div>
        <button
          onClick={() => onRent(item._id)}
          disabled={item.status !== "available"}
          className="w-full mt-3 bg-green-500 text-white py-2 rounded-md disabled:opacity-60"
        >
          {item.status === "available" ? "Rent Now" : "Not Available"}
        </button>
      </div>
    </div>
  );
}
