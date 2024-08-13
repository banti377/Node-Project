import path from "path";
import { modals } from "../model";
import { Post } from "../model/post";

export const getByUser = async (req, res) => {
  try {
    const posts = await modals.Post.find({ userId: req?.me?._id });
    res.status(200).send({ data: posts, success: true, message: "" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await modals.Post.find({}).populate({
      path: "postedBy",
      select: "userName",
    });
    res.status(200).send({ data: posts, success: true, message: "" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { pic } = req.body;

    const newPost = new Post({
      photo: pic,
      postedBy: req.user,
    });

    const savedPost = await newPost.save();

    await modals.User.findByIdAndUpdate(req.user._id, {
      $inc: { postCount: 1 },
    });

    res.status(200).json({
      data: savedPost,
      success: true,
      message: "Created successfully",
    });
  } catch (err) {
    res.status(400).json({ data: null, success: false, message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deletedPost = await modals.Post.findOneAndDelete({
      _id: req?.params?.id,
      userId: req.me._id,
    });

    if (!deletedPost) {
      return res
        .status(404)
        .send({ data: null, success: false, message: "Post not found" });
    }

    await modals.User.findByIdAndUpdate(req.me._id, {
      $inc: { postCount: -1 },
    });

    res
      .status(200)
      .send({ data: null, success: true, message: "Delete successfully" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};
