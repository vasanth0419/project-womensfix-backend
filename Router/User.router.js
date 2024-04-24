import express from "express";
import {
  deleteUserById,
  forgetPassword,
  getUserById,
  loginUser,
  registerAdminUser,
  registerUser,
  resetPassword,
  userapi,
} from "../Controller/User.controller.js";

const router = express.Router();

router.get("/", userapi);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuserbyid/:userid", getUserById);
router.post("/forgetpassword", forgetPassword);
router.get("/resetpassword/:id/:token", resetPassword);
router.delete("/deleteuser/:userId", deleteUserById);
router.post("/adminlogin", registerAdminUser);
export default router;
