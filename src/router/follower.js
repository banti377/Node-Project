import express from "express";
import { auth } from "../middleWare/auth";
import { getPendingRequest, reqHandler, sendRequest, } from "../controller/follower";

const router = express.Router();

router.get("/get-follow-request", getPendingRequest);

router.get("/accept-reject", auth, reqHandler);

router.post("/send-request", auth, sendRequest);

// router.post("/delete", auth, remove)

export default router;
