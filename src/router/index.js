import express from "express"
import { } from "../controller/like"
import { auth } from "../middleWare/auth"

const router = express.Router()

router.get("/getAll", getAll)




export default router