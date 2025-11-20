import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { api } from "../../api/api";

export default function WalletPage({ showMessage }) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const data = await api.wallet.getBalance();
      setBalance(data.balance || 0);
    } catch (err) {
      showMessage(err.message || "Failed", "error");
    }
  };

  const handleAddFunds = async () => {
    if (!amount || amount <= 0) return;
    setLoading(true);
    try {
      await api.wallet.addFunds(parseFloat(amount));
      showMessage("Funds added successfully!");
      setAmount("");
      loadBalance();
    } catch (err) {
      showMessage(err.message || "Top-up failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wallet</h2>
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
            <Wallet className="text-green-600" size={40} />
          </div>
          <p className="text-gray-600 mb-2">Current Balance</p>
          <h3 className="text-4xl font-bold text-gray-800">
            ₹{balance.toFixed(2)}
          </h3>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddFunds}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Add Funds"}
          </button>
        </div>
      </div>
    </div>
  );
}
