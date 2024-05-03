import express from "express";
import { auth } from "../middleWare/auth";
import { getAll, remove, sendMessage } from "../controller/message";
import { deleteMessage, getAll, sendMessage } from "../controller/message";

const router = express.Router();

router.get("/getAll", auth, getAll);

router.post("/send", auth, sendMessage);

router.delete("/delete", auth, remove);

router.delete("/delete/:id", auth, deleteMessage);

export default router;
