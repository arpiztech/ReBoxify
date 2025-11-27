import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  getAllContainers,
  getContainerDetails,
  rentContainer,
  getMyRentals,
  requestReturn,
  getWallet,
  addMoneyToWallet,
  getCO2Stats,
  completePayment,
} from "../controllers/customerController.js";

const router = express.Router();

router.use(protect);

router.get("/containers", getAllContainers);
router.get("/containers/:id", getContainerDetails);
router.post("/rent", authorize("customer"), rentContainer);
router.get("/rentals", authorize("customer"), getMyRentals);
router.post("/return", authorize("customer"), requestReturn);
router.get("/wallet", authorize("customer"), getWallet);
router.post("/wallet/add", authorize("customer"), addMoneyToWallet);
router.get("/co2-stats", authorize("customer"), getCO2Stats);
router.post("/payment", authorize("customer"), completePayment);

export default router;
