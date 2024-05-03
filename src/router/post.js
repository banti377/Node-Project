import express from "express"
import { create, getAll, getByUser, remove } from "../controller/post"
import { auth } from "../middleWare/auth"

const router = express.Router()

router.get("/getAll", getAll)

router.get("/getByUser", auth, getByUser)

router.post("/create", auth, create)

router.delete("/delete", auth, remove)

export default router