import express from "express"
import { create, getAll, getByUser, remove } from "../controller/post"
import { auth } from "../middleWare/auth"

const router = express.Router()

router.get("/getAll", getAll)

router.get("/getByUser", auth, getByUser)

router.post("/create", auth, create)

<<<<<<< HEAD
router.delete("/delete", auth, remove)
=======
router.delete("/delete/:id", auth, remove)
>>>>>>> 4b1154fa5e1cb9125206041c0b093b17ec9f92b2

export default router