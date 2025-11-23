import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  container: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Container",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  depositPaid: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["active", "completed", "returned", "cancelled", "requested_return"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  co2SavedKg: { type: Number, default: 0 },
});

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
