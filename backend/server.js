import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import containerRoutes from "./routes/containerRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);

// Database connect
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/containers", containerRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/wallet", walletRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
