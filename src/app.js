import express from "express";
import cors from "cors";
// import { bodyParser } from "body-parser";
import userRouter from "./router/user";
import postRouter from "./router/post";
import likeRouter from "./router/like";
import followerRouter from "./router/follower";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded())
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/follower", followerRouter);

app.get("/", (_, res) => {
  res.send("Hello World..!");
});

export default app;
