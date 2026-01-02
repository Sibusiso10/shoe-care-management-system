import { NextApiRequest, NextApiResponse } from "next";
import Account from "@/models/SubscriptionAccounts";
import connectDB from "@/lib/db";

const registerAccount = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method !== "POST" ) return res.status(405).end(); 

    try{
        await connectDB();
        const {accountType, amountPaid, datePaidOn, dueDate, clientLoginId} = req.body; 
        const exists = await Account.findOne({clientLoginId});
        if(exists) {return res.status(409).json({message: "User already exists"});}

        const details = new Account({accountType, amountPaid, datePaidOn, dueDate, clientLoginId}); 
        await details.save(); 

        res.status(201).json({message: "success"}); 
        
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

export default registerAccount; 