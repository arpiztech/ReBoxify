import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function WalletPage() {
  const [wallet, setWallet] = useState({ walletBalance: 0, transactions: [] });
  const [amount, setAmount] = useState("");

  const load = async () => {
    const { data } = await API.get("/wallet");
    setWallet(data);
  };
  useEffect(() => {
    load();
  }, []);

  const addMoney = async (e) => {
    e.preventDefault();
    try {
      await API.post("/wallet/add", { amount: Number(amount) });
      setAmount("");
      load();
      alert("Wallet topped up (dummy)");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl mb-3">Wallet</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div>
          Balance: <strong>₹{wallet.walletBalance}</strong>
        </div>
      </div>
      <form onSubmit={addMoney} className="flex gap-2 mb-4">
        <input
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-2 border"
        />
        <button className="p-2 bg-blue-600 text-white">
          Add Money (Dummy)
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Transactions</h3>
        <ul className="mt-2 space-y-2">
          {wallet.transactions.map((tx) => (
            <li key={tx._id} className="flex justify-between">
              <div>
                {tx.description} ({tx.type})
              </div>
              <div>
                ₹{tx.amount}{" "}
                <small>{new Date(tx.createdAt).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
