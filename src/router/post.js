import express from "express"
import { create, getAll, getByUser, remove } from "../controller/post"
import { auth } from "../middleWare/auth"
import multer from "multer";
import fs from "fs"
import { imageUpload } from "../middleWare/imageUpload";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "/public/"
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, "profile" + "." + `${file.originalname.split(".").pop()}`)
    }
})

const upload = multer({ storage });

const router = express.Router()

router.get("/getAll", getAll)

router.get("/getByUser", auth, getByUser)

router.post("/create", auth, create)

router.delete("/delete", auth, remove)

router.delete("/delete/:id", auth, remove)

router.post("/uploadImg", upload.single("avatar"), async (req, res) => {
    let url = await imageUpload(req.file.url);
    res.status(200).send({ data: url, success: true, message: "" });
});

export default router