import express from "express";
import { auth } from "../middleWare/auth";
import { getAll, sendMessage } from "../controller/message";

const router = express.Router();

router.get("/getAll", auth, getAll);

router.post("/send-message", auth, sendMessage);

// router.post("/delete-message", auth, deleteMessage);

export default router;
