import express, { Router } from "express";
import {
  addcart,
  apidress,
  createDress,
  deletedress,
  getalldress,
  updatedress,
} from "../Controller/Dress.controllers.js";

const dressrouter = express.Router();

dressrouter.get("/", apidress);
dressrouter.post("/create", createDress);
dressrouter.get("/getalldress", getalldress);
dressrouter.put("/updatedress/:id", updatedress);
dressrouter.delete("/deletedress/:id", deletedress);
dressrouter.post("/cartpage", addcart);
export default dressrouter;
