import mongoose from "mongoose";
import { config } from "../config";

export const dbConnect = () => {
    return mongoose
        .connect(config.db_url)
        .then(() => {
            console.log("database connect successfully");
        })
        .catch((err) => {
            console.log("------err-----", err)
            console.log("something went wrong in DB connection")
        })
}