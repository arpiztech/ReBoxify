import mongoose from "mongoose";

const containerSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["plastic", "glass", "metal", "mixed"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    image: String,
    quantity: {
      type: Number,
      default: 1,
    },
    available: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Container = mongoose.model("Container", containerSchema);
export default Container;
