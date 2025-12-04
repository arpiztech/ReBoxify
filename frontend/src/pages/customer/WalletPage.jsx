"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingMoney, setAddingMoney] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api.get("/customer/wallet");
      setWallet(data.wallet);
    } catch (error) {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setAddingMoney(true);
    try {
      await api.post("/customer/wallet/add", {
        amount: Number.parseFloat(amount),
      });
      toast.success("Money added successfully");
      setAmount("");
      fetchWallet();
    } catch (error) {
      toast.error("Failed to add money");
    } finally {
      setAddingMoney(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Wallet</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Wallet Balance
              </h2>
              <p className="text-4xl font-bold text-emerald-600">
                ₹{wallet?.balance}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Total Added: ₹{wallet?.totalAdded}
              </p>
              <p className="text-gray-600 text-sm">
                Total Spent: ₹{wallet?.totalSpent}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add Money
              </h2>
              <form onSubmit={handleAddMoney} className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={addingMoney}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {addingMoney ? "Adding..." : "Add Money"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;





"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingMoney, setAddingMoney] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api.get("/customer/wallet");
      setWallet(data.wallet);
    } catch (error) {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setAddingMoney(true);
    try {
      await api.post("/customer/wallet/add", {
        amount: Number.parseFloat(amount),
      });
      toast.success("Money added successfully");
      setAmount("");
      fetchWallet();
    } catch (error) {
      toast.error("Failed to add money");
    } finally {
      setAddingMoney(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Wallet</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Wallet Balance
              </h2>
              <p className="text-4xl font-bold text-emerald-600">
                ₹{wallet?.balance}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Total Added: ₹{wallet?.totalAdded}
              </p>
              <p className="text-gray-600 text-sm">
                Total Spent: ₹{wallet?.totalSpent}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add Money
              </h2>
              <form onSubmit={handleAddMoney} className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={addingMoney}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {addingMoney ? "Adding..." : "Add Money"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;










"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingMoney, setAddingMoney] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api.get("/customer/wallet");
      setWallet(data.wallet);
    } catch (error) {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setAddingMoney(true);
    try {
      await api.post("/customer/wallet/add", {
        amount: Number.parseFloat(amount),
      });
      toast.success("Money added successfully");
      setAmount("");
      fetchWallet();
    } catch (error) {
      toast.error("Failed to add money");
    } finally {
      setAddingMoney(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Wallet</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Wallet Balance
              </h2>
              <p className="text-4xl font-bold text-emerald-600">
                ₹{wallet?.balance}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Total Added: ₹{wallet?.totalAdded}
              </p>
              <p className="text-gray-600 text-sm">
                Total Spent: ₹{wallet?.totalSpent}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add Money
              </h2>
              <form onSubmit={handleAddMoney} className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={addingMoney}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {addingMoney ? "Adding..." : "Add Money"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;





"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingMoney, setAddingMoney] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api.get("/customer/wallet");
      setWallet(data.wallet);
    } catch (error) {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setAddingMoney(true);
    try {
      await api.post("/customer/wallet/add", {
        amount: Number.parseFloat(amount),
      });
      toast.success("Money added successfully");
      setAmount("");
      fetchWallet();
    } catch (error) {
      toast.error("Failed to add money");
    } finally {
      setAddingMoney(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Wallet</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Wallet Balance
              </h2>
              <p className="text-4xl font-bold text-emerald-600">
                ₹{wallet?.balance}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Total Added: ₹{wallet?.totalAdded}
              </p>
              <p className="text-gray-600 text-sm">
                Total Spent: ₹{wallet?.totalSpent}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add Money
              </h2>
              <form onSubmit={handleAddMoney} className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={addingMoney}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {addingMoney ? "Adding..." : "Add Money"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
