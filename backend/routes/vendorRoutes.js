import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  addContainer,
  getMyContainers,
  updateContainer,
  getPendingReturns,
  approveReturn,
  rejectReturn,
  getVendorDashboard,
} from "../controllers/vendorController.js";

const router = express.Router();

router.use(protect);

router.post("/container", authorize("vendor"), addContainer);
router.get("/containers", authorize("vendor"), getMyContainers);
router.patch("/container/:id", authorize("vendor"), updateContainer);
router.get("/returns", authorize("vendor"), getPendingReturns);
router.patch("/return/:id/approve", authorize("vendor"), approveReturn);
router.patch("/return/:id/reject", authorize("vendor"), rejectReturn);
router.get("/dashboard", authorize("vendor"), getVendorDashboard);

export default router;
