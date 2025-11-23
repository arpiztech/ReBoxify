import express from "express";
import { addMoney, getWallet } from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addMoney);
router.get("/", protect, getWallet);

export default router;
