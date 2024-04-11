import express from "express";
// import { bodyParser } from "body-parser";
import userRouter from "./router/user"
import postRouter from "./router/post"
import likeRouter from "./router/like"

const app = express()

app.use(express.json())
// app.use(bodyParser.urlencoded())
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/like", likeRouter)


app.get("/", (_, res) => {
    res.send("Hello World..!")
})

export default app;