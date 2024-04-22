import express from "express"
import { auth } from "../middleWare/auth"
import { getAll, savedPost } from "../controller/savedPost"

const router = express.Router()

router.get("/getAll", auth, getAll)

router.post("/saved-post", auth, savedPost)

export default router