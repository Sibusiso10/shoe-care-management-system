import { NextApiResponse, NextApiRequest } from "next";
import connectDB from "@/lib/db";
import Account from "@/models/Account";
import Orders from "@/models/Orders";
import Coupon from "@/models/Coupon";

const getCostCalculationData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(409).json({ message: "Wrong request" });
    }

    try {
        await connectDB();
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: "Missing userId" });
        }
        const coupons = await Coupon.find(); 

        let userAccountData = await Account.findOne({ userId: userId });
        if (!userAccountData) {
            const details = new Account({accountType : "regular", shoeWashes: 0, userId: userId}); 
            await details.save(); 

            userAccountData = await Account.findOne({ userId: userId });
        }

        // Check if an order exists for this user
        const firstTimeOrder = !(await Orders.exists({ userId: userId }));

        // Send both the boolean and the account data
        return res.status(200).json({
            firstTimeOrder,
            account: userAccountData,
            coupons: coupons
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export default getCostCalculationData;
