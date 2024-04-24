import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
const User = mongoose.model("user", userSchema);

export default User;
