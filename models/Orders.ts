import { time } from "console";
import mongoose from "mongoose";

const Orders = new mongoose.Schema({
    userId: {type: String,  required: true}, 
    accountType: {type:String, required: true},
    numberOfShoes: {type:Number, required: true},
    obtainMethod: {type:String, enum: ["P", "D"], required: true},
    returnMethod: {type:String, enum: ["P", "D"], required: true},
    amountPaid: {type:Number, required: true},
    paymentMethod: {type:String, required: true},

    status: { 
  type: String, 
  enum: ["pending", "collection", "washing", "drying", "complete", "ready", "cancelled"], 
  default: "pending"
},
    date: {type: Date, default: Date.now},
    dueDate: {
  type: Date,
  required: true,
  default: () => {
    const now = new Date();
    now.setDate(now.getDate() + 2);
    return now;
  },
}, 
    obtainTime: {type: String, required: true},
    returnTime: {type: String, required: true},

})

export default mongoose.models.orders || mongoose.model("orders", Orders); 