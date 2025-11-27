import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  getAllUsers,
  deactivateUser,
  getAllRentals,
  getReports,
  getAdminDashboard,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/deactivate", deactivateUser);
router.get("/rentals", getAllRentals);
router.get("/reports", getReports);
router.get("/dashboard", getAdminDashboard);

export default router;
