import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
    relatedTo: {
      type: String,
      enum: ["rental", "refund", "manual", "return"],
    },
    relatedId: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
