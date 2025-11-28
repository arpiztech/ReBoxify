import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import morgan from "morgan";
//import connectDB from "./config/db.js";

import errorHandler from "./middleware/errorHandler.js";
// Routes (will be added in next steps)
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
//app.use(morgan("dev"));
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

// Database connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
