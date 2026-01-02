import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    userName: {type: String, required: true}, 
    password: {type: String, required: true},
})

export default mongoose.models.adminlogin || mongoose.model('adminlogin', AdminSchema); 