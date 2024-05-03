import { modals } from "../model";

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
    const posts = await modals.Post.find({});
    res.status(200).send({ data: posts, success: true, message: "" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    let input = req?.body;
    input.userId = req?.me?._id;
    const newPost = await modals.Post.create(input);
    res
      .status(200)
      .send({ data: newPost, success: true, message: "Created successfully" });
  } catch (err) {
    res.status(400).send({ data: null, success: false, message: err.message });
  }
};

export const remove = (req, res) => {
  modals.Post.findOneAndDelete({ _id: req?.params?.id, userId: req.me._id })
    .then((resData) => {
      if (!resData) {
        return res
          .status(404)
          .send({ data: null, success: false, message: "Post not found" });
      }
      res
        .status(200)
        .send({ data: null, success: true, message: "Delete successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
}
