import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const savedPostSchema = mongoose.Schema(
    {
        postId: {
            type: ObjectId,
            ref: "post"
        },
        userId: {
            type: ObjectId,
            ref: "user"
        }
    },

    { timestamps: true }
)

export const SavedPost = mongoose.model("savedPost", savedPostSchema)