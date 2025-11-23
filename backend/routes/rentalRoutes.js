import express from "express";
import {
  createRental,
  getMyRentals,
  requestReturn,
  confirmReturn,
} from "../controllers/rentalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/rent", protect, createRental);
router.get("/my", protect, getMyRentals);
router.post("/request-return", protect, requestReturn);

// Admin/vendor confirm endpoint (protected but no role-check here)
router.post("/confirm-return", protect, confirmReturn);

export default router;
