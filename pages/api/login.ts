import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import Admin from "@/models/Admin";



const login = async (req: NextApiRequest, res:NextApiResponse) => {

    if(req.method !== "POST") return res.status(409).json({message: "Wrong request"}); 
    try{
        await connectDB(); 
        const {email, password} = req.body;

            const userData = await User.findOne({email: email})
            if(userData){ 
                const isMatch = await bcrypt.compare(password, userData.password);
            if(isMatch){
                 return res.status(201).json({message: "clientLoginTrue", _id: userData._id}); 
            }
             return res.status(301).json({message: "Invalid Password"}); 
            }
            return res.status(400).json({message: "User not found"}); 
        
       
    }catch(err){
        console.error("Login error: " , err); 
        return res.status(500).json({message: "Server error"})
    }
}

export default login;