import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: {
                values: ["post", "reel"],
                message: `{VALUE} is not supported`
            },
        },
        post: [String],
        caption: {
            type: String,
            trim: true
        },
        hasTag: [String],
        tagUserId: [{ type: ObjectId, ref: "user" }],
        userId: {
            type: ObjectId,
            ref: "user"
        }
    },

    { timestamps: true }
)

export const Post = mongoose.model("post", postSchema)