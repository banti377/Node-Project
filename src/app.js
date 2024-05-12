import express from "express";
import cors from "cors";
// import { bodyParser } from "body-parser";
import userRouter from "./router/user";
import postRouter from "./router/post";
import likeRouter from "./router/like";
import followerRouter from "./router/follower";
import savedPostRouter from "./router/savedPost";
import messageRouter from "./router/message";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded())
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/follower", followerRouter);
app.use("/savedPost", savedPostRouter);
app.use("/message", messageRouter);

app.get("/", (_, res) => {
  res.send("Hello World..!");
});

app.use(express.static(path.join(__dirname, '..', 'public')))
export default app;
