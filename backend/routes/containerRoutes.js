import express from "express";
import {
  listContainers,
  getContainer,
} from "../controllers/containerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listContainers);
router.get("/:id", getContainer);

export default router;
