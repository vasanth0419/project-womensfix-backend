import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    // console.log(process.env.MONGODBCONNECTIONSTRING);
    const mongoURL = process.env.MONGODBCONNECTIONSTRING;
    const connection = await mongoose.connect(mongoURL);
    console.log("connected to the MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connenting to mongodb", error.message);
  }
};
