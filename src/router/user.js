import express from "express";
import {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
  sendOTP,
} from "../controller/user";
import { auth } from "../middleWare/auth";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", auth, resetPassword);

router.post("/sendOtp", sendOTP);

export default router;
