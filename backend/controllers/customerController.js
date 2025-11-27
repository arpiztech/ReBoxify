import Rental from "../models/Rental.js";
import Container from "../models/Container.js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import CO2Stats from "../models/CO2Stats.js";
import ReturnRequest from "../models/ReturnRequest.js";
import { calculateCO2Savings } from "../utils/co2Calculator.js";

export const getAllContainers = async (req, res, next) => {
  try {
    const { category, priceMax, search } = req.query;
    const query = { isActive: true, available: { $gt: 0 } };

    if (category) query.category = category;
    if (priceMax) query.pricePerDay = { $lte: priceMax };
    if (search) query.name = { $regex: search, $options: "i" };

    const containers = await Container.find(query).populate(
      "vendorId",
      "name email"
    );
    res.json({ containers });
  } catch (error) {
    next(error);
  }
};

export const getContainerDetails = async (req, res, next) => {
  try {
    const container = await Container.findById(req.params.id).populate(
      "vendorId",
      "name email"
    );
    if (!container) {
      return res.status(404).json({ message: "Container not found" });
    }
    res.json({ container });
  } catch (error) {
    next(error);
  }
};

export const rentContainer = async (req, res, next) => {
  try {
    const { containerId, startDate, endDate, quantity } = req.body;

    const container = await Container.findById(containerId);
    if (!container || container.available < quantity) {
      return res.status(400).json({ message: "Container not available" });
    }

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = container.pricePerDay * days * quantity;

    const rental = new Rental({
      customerId: req.user._id,
      containerId,
      vendorId: container.vendorId,
      startDate,
      endDate,
      quantity,
      totalPrice,
      co2Saved: calculateCO2Savings(container.category, days),
    });

    await rental.save();

    // Deduct from available
    container.available -= quantity;
    await container.save();

    res.status(201).json({ message: "Rental created", rental });
  } catch (error) {
    next(error);
  }
};

export const getMyRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find({ customerId: req.user._id })
      .populate("containerId")
      .populate("vendorId", "name email");

    res.json({ rentals });
  } catch (error) {
    next(error);
  }
};

export const requestReturn = async (req, res, next) => {
  try {
    const { rentalId, reason } = req.body;

    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    const returnRequest = new ReturnRequest({
      rentalId,
      customerId: req.user._id,
      vendorId: rental.vendorId,
      reason,
    });

    await returnRequest.save();
    res.status(201).json({ message: "Return request created", returnRequest });
  } catch (error) {
    next(error);
  }
};

export const getWallet = async (req, res, next) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id }).populate(
      "transactions"
    );

    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id });
    }

    res.json({ wallet });
  } catch (error) {
    next(error);
  }
};

export const addMoneyToWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    let wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id });
    }

    wallet.balance += amount;
    wallet.totalAdded += amount;
    await wallet.save();

    const transaction = new Transaction({
      walletId: wallet._id,
      userId: req.user._id,
      type: "credit",
      amount,
      description: "Wallet top-up",
      relatedTo: "manual",
    });

    await transaction.save();
    wallet.transactions.push(transaction._id);
    await wallet.save();

    res.json({ message: "Money added to wallet", wallet });
  } catch (error) {
    next(error);
  }
};

export const getCO2Stats = async (req, res, next) => {
  try {
    let stats = await CO2Stats.findOne({ userId: req.user._id });

    if (!stats) {
      stats = await CO2Stats.create({ userId: req.user._id });
    }

    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

export const completePayment = async (req, res, next) => {
  try {
    const { rentalId } = req.body;

    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet || wallet.balance < rental.totalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    wallet.balance -= rental.totalPrice;
    wallet.totalSpent += rental.totalPrice;
    await wallet.save();

    rental.status = "confirmed";
    rental.paymentStatus = "completed";
    await rental.save();

    // Update CO2 stats
    const co2Stats = await CO2Stats.findOne({ userId: req.user._id });
    if (co2Stats) {
      co2Stats.totalCO2Saved += rental.co2Saved;
      co2Stats.rentalsCount += 1;
      await co2Stats.save();
    }

    const transaction = new Transaction({
      walletId: wallet._id,
      userId: req.user._id,
      type: "debit",
      amount: rental.totalPrice,
      description: `Payment for rental`,
      relatedTo: "rental",
      relatedId: rentalId,
    });

    await transaction.save();

    res.json({ message: "Payment completed", rental });
  } catch (error) {
    next(error);
  }
};
