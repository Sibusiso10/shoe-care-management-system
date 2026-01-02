import { NextApiRequest, NextApiResponse } from "next";
import Orders from "@/models/Orders";
import connectDB from "@/lib/db";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST"){
        res.status(409).json({message:"Wrong request"}); 
    }


    try{
        await connectDB();
        const userId = req.body
        const orders = await Orders.find({userId: userId}); 

        if(!orders){
            return res.status(409).json({message: "No orders Exist"}); 
        }

        return res.status(201).json({message: "Orders Found", orders})

    }catch(err:any){
        console.error(err); 
        res.status(500).json({message: "Server Error"}); 
    }
}

export default handler; 