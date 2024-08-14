import { modals } from "../model";

export const savedPost = async (req, res) => {
  let input = req?.body;
  input.userId = req?.user?._id;
  await modals.SavedPost.findOne(input)
    .then(async (existingSaved) => {
      if (existingSaved) {
        await modals.SavedPost.findByIdAndDelete(existingSaved._id);
        await modals.Post.findByIdAndUpdate(existingSaved.postId);
        res
          .status(200)
          .send({ data: null, success: true, message: "Unsaved successfully" });
      } else {
        modals.SavedPost.create(input)
          .then(async (resData) => {
            res.status(200).send({
              data: resData,
              success: true,
              message: "Saved successfully",
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

export const getAll = async (req, res) => {
  try {
    const mySavedPosts = await modals.SavedPost.find({
      userId: req.user._id,
    }).populate("postId", "_id photo");
    console.log("🚀 ~ getAll ~ mySavedPosts:", mySavedPosts);
    res.status(200).json({ data: mySavedPosts, success: true, message: "" });
  } catch (err) {
    res.status(400).json({ data: null, success: false, message: err.message });
  }
};
