import express from "express"
import { auth } from "../middleWare/auth"
import { likeDislike } from "../controller/like"

const router = express.Router()

// router.get("/getAll", getAll)

// router.get("/getByUser", auth, getByUser)

router.post("/like-dislike", auth, likeDislike)

// router.post("/delete", auth, remove)

export default router