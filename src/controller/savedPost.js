import { modals } from "../model";

export const savedPost = (req, res) => {
    let input = req?.body
    input.userId = req?.me?._id
    modals.SavedPost.findOne(input)
        .then(async (existingSaved) => {
            if (existingSaved) {
                await modals.SavedPost.findByIdAndDelete(existingSaved._id);
                await modals.Post.findByIdAndUpdate(existingSaved.postId);
                res.status(200).send({ data: null, success: true, message: "Unsaved successfully" });
            } else {
                modals.SavedPost.create(input)
                    .then(async (resData) => {
                        res.status(200).send({ data: resData, success: true, message: "Saved successfully" })
                    })
                    .catch((err) => {
                        res.status(400).send({ data: null, success: false, message: err.message })
                    })
            }
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}

export const getAll = (req, res) => {
    modals.SavedPost.find({})
        .then((resData) => {
            res.status(200).send({ data: resData, success: true, message: "" })
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}