import express from "express";

import {
  addTrend,
  getAllTrends,
  updateTrend,
} from "../Controller/Trends.controllers.js";

const trendsrouter = express.Router();

trendsrouter.get("/trendsall", getAllTrends);
trendsrouter.post("/trendsadd", addTrend);
trendsrouter.put("/trendsupdate/:id", updateTrend);
export default trendsrouter;
