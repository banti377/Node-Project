import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      // enum: {
      //   values: ["post", "reel"],
      //   message: `{VALUE} is not supported`,
      // },
      require: true,
      // default: "post",
    },
    photo: {
      type: [String],
      require: true,
    },
    caption: {
      type: String,
      require: true,
      // trim: true,
      // maxlength: 2200,
    },
    // hasTag: {
    //   type: [String],
    //   default: [],
    // },
    // tagUserId: [
    //   {
    //     type: ObjectId,
    //     ref: "user",
    //   },
    // ],
    postedBy: {
      type: ObjectId,
      ref: "user",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
