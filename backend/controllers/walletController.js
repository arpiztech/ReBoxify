import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// Add money to wallet
export const addMoney = async (req, res) => {
  try {
    const user = req.user;
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    // Simulated successful payment
    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    const tx = await Transaction.create({
      user: user._id,
      type: "credit",
      amount,
      description: "Wallet top-up",
    });

    res.json({
      message: "Wallet topped up",
      walletBalance: user.walletBalance,
      tx,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wallet balance + transactions
export const getWallet = async (req, res) => {
  try {
    const user = req.user;

    const transactions = await Transaction.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      walletBalance: user.walletBalance || 0,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
