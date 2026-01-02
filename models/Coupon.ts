import mongoose from "mongoose";

const Coupons = new mongoose.Schema(
    {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discount: {
      type: Number, // 0.2 = 20%
      required: true,
      min: 0,
      max: 1,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Coupon || mongoose.model("Coupon", Coupons);