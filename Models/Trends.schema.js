import mongoose from "mongoose";

const trendSchema = new mongoose.Schema({
  title: String,
  date: String,
  excerpt: String,
  image: String,
});
const Trends = mongoose.model("Trend", trendSchema);
export default Trends;
