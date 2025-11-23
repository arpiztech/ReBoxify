import express from "express";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/authController.js";

const router = express.Router();

// Protected Route → User Profile
router.get("/profile", protect, getProfile);

// Vendor-only Route → Requires Vendor Role
router.post("/vendor-only", protect, authorizeRole("vendor"));

export default router;
