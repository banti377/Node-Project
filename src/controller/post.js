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
    // Fetch all posts
    const posts = await modals.Post.find({})
      .populate({
        path: "postedBy",
        select: "userName",
      })
      .exec();

    // Fetch liked posts for the user
    const userLikes = await modals.Like.find({ userId: req.user._id });
    const likedPostIds = userLikes.map((like) => like.postId.toString());

    // Fetch saved posts for the user
    const userSavedPosts = await modals.SavedPost.find({
      userId: req.user._id,
    });
    const savedPostIds = userSavedPosts.map((saved) => saved.postId.toString());

    // Include liked and saved status for each post
    const postsWithStatus = posts.map((post) => ({
      ...post.toObject(),
      liked: likedPostIds.includes(post._id.toString()),
      saved: savedPostIds.includes(post._id.toString()),
    }));

    res.status(200).send({ data: postsWithStatus, success: true, message: "" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { pic, caption } = req.body;

    const newPost = new Post({
      caption,
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

export const getMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
    res.status(200).json({ data: myPosts, success: true, message: "" });
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
