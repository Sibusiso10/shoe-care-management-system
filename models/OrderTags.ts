import mongoose from "mongoose";

const OrderTagSchema = new mongoose.Schema(
  {
    code: {
      type: String, // e.g. "A1", "A2"
      required: true,
      unique: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      default: null,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    releasedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.orderTags ||
  mongoose.model("orderTags", OrderTagSchema);
