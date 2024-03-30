import mongoose from "mongoose";
const CouponSchema = new mongoose.Schema({
  c_id: { type: Number, required: true },
  desc: { type: String, required: true },
  CName: { type: String, required: true },
  winner:{type: mongoose.Schema.Types.ObjectId,ref: "userModel" },
  timestrap: { type: Number, default: new Date().getTime() },
});

export default mongoose.model("coupons", CouponSchema);
