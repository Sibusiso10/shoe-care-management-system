import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Orders from "@/models/Orders";


const handler = async (req: NextApiRequest, res:NextApiResponse) =>{
    if(req.method !== "GET"){
        return res.status(409).json({message: "Wrong request"}); 
    }

    try{
        await connectDB(); 
        const orders = await Orders.find(); 
        if(!orders){
            return res.status(409).json({message: "No orders"}); 
        }
        return res.status(200).json({message: "found", orders }); 
    }catch(err:any){
        console.error(err); 
        return res.status(500).json({message: "Server Error"}); 
    }
}


export default handler; 