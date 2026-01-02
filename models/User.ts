import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const ClientLoginSchema = new mongoose.Schema({
    email: { type: String, unique: true},
    password: {type: String, required: true}, 
})

export default mongoose.models.clientLogins || mongoose.model('clientLogins', ClientLoginSchema); 