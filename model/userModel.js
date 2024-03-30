import mongoose,{Schema} from "mongoose";
const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  coupons: { type: Schema.Types.ObjectId, ref: "coupons" },
});

export default mongoose.model("userModel", UserSchema);
