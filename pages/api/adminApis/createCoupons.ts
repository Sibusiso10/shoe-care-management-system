import { NextApiResponse, NextApiRequest } from "next";
import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";
import AccountCoupons from "@/models/AccountCoupons";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

      if (req.method !== "POST") {
        return res.status(409).json({ message: "Wrong request" });
    }

  try {
    await connectDB();

    const {
      code,
      discount,
      expiresAt,
      theType, // "regular" | "account"
    } = await req.body;

    if (!code || !discount || !expiresAt || !theType) {
      return res.status(400).json(
        { message: "Missing required fields" },

      );
    }

    if (discount <= 0 || discount > 1) {
      return res.status(400).json(
        { message: "Discount must be between 0 and 1" }
      );
    }

    const expiry = new Date(expiresAt);
    if (expiry <= new Date()) {
      return res.status(400).json(
        { message: "Expiry date must be in the future" }
      );
    }

    let createdCoupon;

    // 🔀 ROUTE BY TYPE
    if (theType === "regular") {
      const exists = await Coupon.findOne({ code });
      if (exists) {
        return res.status(409).json(
          { message: "Coupon already exists" }
        );
      }

      createdCoupon = await Coupon.create({
        code,
        discount,
        expiresAt: expiry,
      });
    }

    else if (theType === "account") {
      const exists = await AccountCoupons.findOne({ code });
      if (exists) {
        return res.status(409).json(
          { message: "Account coupon already exists" },
        );
      }

      createdCoupon = await AccountCoupons.create({
        code,
        discount,
        expiresAt: expiry,
      });
    }

    else {
      return res.status(400).json(
        { message: "Invalid coupon type" }
      );
    }

    return res.status(201).json(
      { message: "Coupon created", coupon: createdCoupon },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      { message: "Server error" }
    );
  }
}


export default handler; 