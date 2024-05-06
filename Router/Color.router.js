import express, { Router } from "express";
import { createDress, getallcolordress } from "../Controller/Colors.controllers.js";

const dresscolorrouter = express.Router();

dresscolorrouter.post("/dresscoloradd", createDress);
dresscolorrouter.get("/getallcolordress",getallcolordress)
export default dresscolorrouter;
