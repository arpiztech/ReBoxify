import mongoose from "mongoose";

const vendorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: String,
    businessDescription: String,
    businessLicense: String,
    totalContainers: {
      type: Number,
      default: 0,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    documents: {
      licenseImage: String,
      certificationImage: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const VendorProfile = mongoose.model("VendorProfile", vendorProfileSchema);
export default VendorProfile;
