import Container from "../models/Container.js";
import ReturnRequest from "../models/ReturnRequest.js";
import Rental from "../models/Rental.js";
import VendorProfile from "../models/VendorProfile.js";

export const addContainer = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      capacity,
      dimensions,
      pricePerDay,
      quantity,
    } = req.body;

    const container = new Container({
      vendorId: req.user._id,
      name,
      description,
      category,
      capacity,
      dimensions,
      pricePerDay,
      quantity,
      available: quantity,
    });

    await container.save();

    // Update vendor profile
    await VendorProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $inc: { totalContainers: 1 } }
    );

    res.status(201).json({ message: "Container added", container });
  } catch (error) {
    next(error);
  }
};

export const getMyContainers = async (req, res, next) => {
  try {
    const containers = await Container.find({ vendorId: req.user._id });
    res.json({ containers });
  } catch (error) {
    next(error);
  }
};

export const updateContainer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { available, isActive, pricePerDay } = req.body;

    const container = await Container.findByIdAndUpdate(
      id,
      { available, isActive, pricePerDay },
      { new: true }
    );

    if (!container) {
      return res.status(404).json({ message: "Container not found" });
    }

    res.json({ message: "Container updated", container });
  } catch (error) {
    next(error);
  }
};

export const getPendingReturns = async (req, res, next) => {
  try {
    const returns = await ReturnRequest.find({
      vendorId: req.user._id,
      status: "pending",
    })
      .populate("rentalId")
      .populate("customerId", "name email");

    res.json({ returns });
  } catch (error) {
    next(error);
  }
};

export const approveReturn = async (req, res, next) => {
  try {
    const { id } = req.params;

    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!returnRequest) {
      return res.status(404).json({ message: "Return request not found" });
    }

    const rental = await Rental.findByIdAndUpdate(returnRequest.rentalId, {
      status: "returned",
    });

    // Return containers to inventory
    const container = await Container.findById(rental.containerId);
    container.available += rental.quantity;
    await container.save();

    res.json({ message: "Return approved", returnRequest });
  } catch (error) {
    next(error);
  }
};

export const rejectReturn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      id,
      { status: "rejected", notes: reason },
      { new: true }
    );

    if (!returnRequest) {
      return res.status(404).json({ message: "Return request not found" });
    }

    res.json({ message: "Return rejected", returnRequest });
  } catch (error) {
    next(error);
  }
};

export const getVendorDashboard = async (req, res, next) => {
  try {
    const containers = await Container.find({ vendorId: req.user._id });
    const rentals = await Rental.find({ vendorId: req.user._id });
    const profile = await VendorProfile.findOne({ userId: req.user._id });

    const stats = {
      totalContainers: containers.length,
      totalRentals: rentals.length,
      activeRentals: rentals.filter((r) => r.status === "rented").length,
      totalRevenue: rentals.reduce((sum, r) => sum + r.totalPrice, 0),
    };

    res.json({ stats, profile });
  } catch (error) {
    next(error);
  }
};
