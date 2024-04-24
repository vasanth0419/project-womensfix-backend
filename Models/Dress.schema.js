import mongoose from "mongoose";

const dressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  style: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String },
});

const Dress = mongoose.model("Dress", dressSchema);

export default Dress;
