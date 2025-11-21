import { useEffect, useState } from "react";
import api from "../api/api";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await api.get("/customer/wallet");
        setWallet(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadWallet();
  }, []);

  if (!wallet) return <p className="p-4">Loading wallet...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Wallet</h1>

      <div className="p-4 bg-gray-100 rounded shadow">
        <p className="text-lg">Balance: ₹{wallet.balance}</p>
        <p className="text-sm text-gray-600">
          Pending Penalties: ₹{wallet.penalties}
        </p>
      </div>
    </div>
  );
};

export default WalletPage;
