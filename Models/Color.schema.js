import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  day: { type: String },
  description: { type: String },
  image: { type: String },
});

const Color = mongoose.model("Color", colorSchema);

export default Color;
