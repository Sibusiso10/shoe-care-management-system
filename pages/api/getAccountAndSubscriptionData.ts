import { NextApiRequest, NextApiResponse } from "next";
import Account from "@/models/Account";
import SubscriptionAccounts from "@/models/SubscriptionAccounts";
import connectDB from "@/lib/db";


const handler = async (req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "POST"){
        return res.status(409).json({message: "Wrong request!"}); 
    }
    try{
        await connectDB(); 

        const userId = req.body; 
        if(!userId){
            return res.status(409).json({message: "No user Id was pass, make sure to login"}); 
        }
        const subscriptionTransactions = await SubscriptionAccounts.find({userId: userId}); 
        let accountData = await Account.findOne({userId: userId}); 
        if(!accountData){
            const account = await Account.create({
            userId: userId,
            accountType: "regular", 
            shoeWashes: 0,  }); 
            if(account){
                accountData = account;  
            }}
        return res.status(201).json({message: "Data found", subscriptionTransactions: subscriptionTransactions, accountData: accountData})

    }catch(err: any){
        console.error(err); 
        return res.status(500).json({message: "Server Error"}); 
    }
}

export default handler; 