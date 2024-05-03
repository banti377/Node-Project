import express from "express";
import { auth } from "../middleWare/auth";
<<<<<<< HEAD
import { getAll, remove, sendMessage } from "../controller/message";
=======
import { deleteMessage, getAll, sendMessage } from "../controller/message";
>>>>>>> 4b1154fa5e1cb9125206041c0b093b17ec9f92b2

const router = express.Router();

router.get("/getAll", auth, getAll);

router.post("/send", auth, sendMessage);

<<<<<<< HEAD
router.delete("/delete", auth, remove);
=======
router.delete("/delete/:id", auth, deleteMessage);
>>>>>>> 4b1154fa5e1cb9125206041c0b093b17ec9f92b2

export default router;
