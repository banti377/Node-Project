import express from "express";
import {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
  sendOTP,
} from "../controller/user";
import { auth } from "../middleWare/auth";
import multer from "multer";
import fs from "fs";
import { imageUpload } from "../middleWare/imageUpload";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "/public/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, "profile" + "." + `${file.originalname.split(".").pop()}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", auth, resetPassword);

router.post("/sendOtp", sendOTP);

router.post("/uploadImg", upload.single("avatar"), async (req, res) => {
  let url = await imageUpload(req.file.url);
  res.status(200).send({ data: url, success: true, message: "" });
});

export default router;
