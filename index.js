import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./Database/Dbconfig.js";
import userrouter from "./Router/User.router.js";
import dressrouter from "./Router/Dress.router.js";
import trendsrouter from "./Router/Trends.router.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

connectDB();
app.use("/user", userrouter);
app.use("/dresses", dressrouter);
app.use("/trends", trendsrouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
