import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import bcrypt from "bcrypt";
import Admin from "@/models/Admin";


const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {

    if(req.method !== "POST"){
        return res.status(405).end(); 
    }

    try{

                await connectDB(); 
     const {userName, password} = req.body; 
     const user = await Admin.findOne({userName: userName}); 
     if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match) 
        {
            return res.status(200).json({message: "Login successful", status: true, id: user.id})
        }
            return res.status(201).json({message: "Login failed, Invalid password", status: false})
     }

     return res.status(201).json({message: "User name not found"})
}catch(err){
        return res.status(500).json({message: "Server Error", err})
    }


}

export default handler; 