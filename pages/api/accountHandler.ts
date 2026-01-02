import {NextApiRequest, NextApiResponse} from "next"; 
import Account from "@/models/Account";
import SubscriptionAccounts from "@/models/SubscriptionAccounts";
import connectDB from "@/lib/db";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method !== "POST"){
        return res.status(409).json({message: "Wrong request"}); 
    }

    try{
        await connectDB();

        const {userId, accountType, amountPaid} = req.body; 
        const account = await Account.findOne({userId: userId}); 
        if (!account) {
           await account.create({
            userId: userId,
            accountType: "regular", 
            shoeWashes: 0,  }); 
        }

        if(accountType === "regular") {
            await SubscriptionAccounts.updateMany(
            { userId, status: "active" },
            { status: "cancelled" }
            );

            account.accountType = "regular";
            account.transactionId = null;
            await account.save();
            return res.status(200).json({message: "account was successfully change to regular"}); 
        }

        await SubscriptionAccounts.updateMany(
        { userId, status: "active" },
        { status: "expired" }
        );

        const transaction = await SubscriptionAccounts.create({
            accountType: accountType, 
            amountPaid: amountPaid,
            userId : userId, 
            paymentMethod: "card", 
            status: "active",
        });
        if(!transaction) {
            return res.status(409).json({message: "Transaction faild"}); 
        }

            const shoeWashesMap: Record<string, number> = {
      basic: 4,
      normal: 9,
      premium: 18,
    };
    account.accountType = accountType;
    account.transactionId = transaction._id;
    account.shoeWashes += shoeWashesMap[accountType] || 0;
    console.log(account); 
    await account.save(); 


    res.status(201).json({message: "Subscription Transaction successfully"}); 

    }catch(err){
        console.error(err); 
        return res.status(500).json({message: "Server Error"}); 
    }
}

export default handler; 