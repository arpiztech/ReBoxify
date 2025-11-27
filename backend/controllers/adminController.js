import User from "../models/User.js";
import Rental from "../models/Rental.js";
import Container from "../models/Container.js";
import CO2Stats from "../models/CO2Stats.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const query = {};

    if (role) query.role = role;

    const users = await User.find(query).select("-password");
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deactivated", user });
  } catch (error) {
    next(error);
  }
};

export const getAllRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find()
      .populate("customerId", "name email")
      .populate("vendorId", "name email")
      .populate("containerId", "name");

    res.json({ rentals });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const totalRentals = await Rental.countDocuments();
    const completedRentals = await Rental.countDocuments({
      status: "returned",
    });

    const allStats = await CO2Stats.find();
    const totalCO2Saved = allStats.reduce(
      (sum, stat) => sum + stat.totalCO2Saved,
      0
    );

    const rentalRevenue = await Rental.aggregate([
      { $match: { paymentStatus: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      report: {
        totalUsers,
        totalVendors,
        totalRentals,
        completedRentals,
        totalCO2Saved,
        totalRevenue: rentalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContainers = await Container.countDocuments();
    const totalRentals = await Rental.countDocuments();
    const totalCO2 = await CO2Stats.aggregate([
      { $group: { _id: null, total: { $sum: "$totalCO2Saved" } } },
    ]);

    res.json({
      dashboard: {
        totalUsers,
        totalContainers,
        totalRentals,
        totalCO2Saved: totalCO2[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
