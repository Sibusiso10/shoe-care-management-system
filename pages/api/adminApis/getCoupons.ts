import { NextApiRequest, NextApiResponse } from "next";
import AccountCoupons from "@/models/AccountCoupons";
import Coupon from "@/models/Coupon";
import connectDB from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 
    if(req.method !== "GET") 
        return res.status(409).json({message: "Wrong request"}); 


    try{
        await connectDB(); 

        const coupons = await Coupon.find(); 
        const accountCoupons = await AccountCoupons.find(); 
        if(!coupons || !accountCoupons)
            {return res.status(400).json({message: "No coupons found"})}

        
        return res.status(201).json({message: "Got the conpons", accountCoupons, coupons})

    }
    catch(err){
        return res.status(500).json({message: "Server Error,", error: err})
    }
    
}

export default handler; 