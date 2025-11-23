import mongoose from "mongoose";

const containerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  deposit: { type: Number, default: 0 },
  rentalPricePerDay: { type: Number, required: true },
  availableQty: { type: Number, default: 1 },
  co2SavedPerUseKg: { type: Number, default: 0.5 }, // estimate per use
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Container = mongoose.model("Container", containerSchema);
export default Container;
