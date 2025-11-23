import Rental from "../models/Rental.js";
import Container from "../models/Container.js";
import calcCO2 from "../utils/co2Calculator.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// Create a rental
export const createRental = async (req, res) => {
  try {
    const user = req.user;
    const { containerId, startDate, endDate } = req.body;

    if (!containerId || !startDate || !endDate)
      return res.status(400).json({ message: "Missing fields" });

    const container = await Container.findById(containerId);
    if (!container)
      return res.status(404).json({ message: "Container not found" });

    if (container.availableQty < 1)
      return res.status(400).json({ message: "No containers available" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    const totalAmount = days * container.rentalPricePerDay;
    const deposit = container.deposit || 0;

    // Payment: wallet preferred
    let fromWallet = false;
    if (user.walletBalance >= totalAmount + deposit) {
      user.walletBalance -= totalAmount + deposit;
      await user.save();

      await Transaction.create({
        user: user._id,
        type: "debit",
        amount: totalAmount + deposit,
        description: "Rental payment (wallet)",
      });

      fromWallet = true;
    } else {
      await Transaction.create({
        user: user._id,
        type: "debit",
        amount: totalAmount + deposit,
        description: "Rental payment (external)",
      });
    }

    // Reduce container stock
    container.availableQty = Math.max(0, container.availableQty - 1);
    await container.save();

    const co2Saved = calcCO2(container, days);

    const rental = await Rental.create({
      customer: user._id,
      container: container._id,
      startDate: start,
      endDate: end,
      totalAmount,
      depositPaid: deposit,
      status: "active",
      co2SavedKg: co2Saved,
    });

    res.status(201).json({ rental, paidFromWallet: fromWallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's rentals
export const getMyRentals = async (req, res) => {
  try {
    const userId = req.user._id;

    const rentals = await Rental.find({ customer: userId })
      .populate("container")
      .sort({ createdAt: -1 });

    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request a return
export const requestReturn = async (req, res) => {
  try {
    const { rentalId } = req.body;
    const userId = req.user._id;

    const rental = await Rental.findOne({ _id: rentalId, customer: userId });
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.status !== "active")
      return res.status(400).json({ message: "Rental not active" });

    rental.status = "requested_return";
    await rental.save();

    res.json({ message: "Return requested", rental });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Confirm return (Vendor/Admin)
export const confirmReturn = async (req, res) => {
  try {
    const { rentalId } = req.body;

    const rental = await Rental.findById(rentalId)
      .populate("container")
      .populate("customer");

    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.status !== "requested_return" && rental.status !== "active")
      return res.status(400).json({ message: "Invalid rental status" });

    rental.status = "returned";
    await rental.save();

    // Increase qty back
    const container = rental.container;
    container.availableQty = (container.availableQty || 0) + 1;
    await container.save();

    // Refund deposit
    const customer = rental.customer;
    if (rental.depositPaid > 0) {
      customer.walletBalance =
        (customer.walletBalance || 0) + rental.depositPaid;
      await customer.save();

      await Transaction.create({
        user: customer._id,
        type: "credit",
        amount: rental.depositPaid,
        description: "Deposit refund",
      });
    }

    res.json({
      message: "Return confirmed and deposit refunded",
      rental,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
