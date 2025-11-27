import mongoose from "mongoose";

const co2StatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalCO2Saved: {
      type: Number,
      default: 0,
    },
    rentalsCount: {
      type: Number,
      default: 0,
    },
    averageSavingsPerRental: {
      type: Number,
      default: 0,
    },
    ecoScore: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CO2Stats = mongoose.model("CO2Stats", co2StatsSchema);
export default CO2Stats;
