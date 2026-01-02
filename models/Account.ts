import mongoose from "mongoose";

const Accounts = new mongoose.Schema({
    accountType:{ type : String, enum:["regular", "basic", "normal", "premium"],  required: true, default: "regular"},
    shoeWashes: {type: Number, default : 0},
    userId: {type: String, required: true, unique: true}, 
    transactionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "subscriptionAccounts",
  default: null,
},
    }
)

export default mongoose.models.accounts || mongoose.model('accounts', Accounts);