import { modals } from "../model";

export const getByUser = (req, res) => {
  modals.Post.find({ userId: req?.user?._id })
    .then((resData) => {
      res.status(200).send({ data: resData, success: true, message: "" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

export const getAll = (req, res) => {
  modals.Post.find({})
    .then((resData) => {
      res.status(200).send({ data: resData, success: true, message: "" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

export const likeDislike = (req, res) => {
  let input = req?.body;
  input.userId = req?.user?._id;
  modals.Like.findOne(input)
    .then(async (existingLike) => {
      if (existingLike) {
        await modals.Like.findByIdAndDelete(existingLike._id);
        await modals.Post.findByIdAndUpdate(existingLike.postId, {
          $inc: { likeCount: -1 },
        });
        res
          .status(200)
          .send({
            data: null,
            success: true,
            message: "Disliked successfully",
          });
      } else {
        modals.Like.create(input)
          .then(async (resData) => {
            await modals.Post.findByIdAndUpdate(resData.postId, {
              $inc: { likeCount: 1 },
            });
            res
              .status(200)
              .send({
                data: resData,
                success: true,
                message: "Liked successfully",
              });
          })
          .catch((err) => {
            res
              .status(400)
              .send({ data: null, success: false, message: err.message });
          });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};
