import { modals } from "../model"

export const getByUser = (req, res) => {
    modals.Post.find({ userId: req?.me?._id })
        .then((resData) => {
            res.status(200).send({ data: resData, success: true, message: "" })
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}

export const getAll = (req, res) => {
    modals.Post.find({})
        .then((resData) => {
            res.status(200).send({ data: resData, success: true, message: "" })
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}


export const create = (req, res) => {
    let input = req?.body
    input.userId = req?.me?._id
    modals.Post.create(input)
        .then((resData) => {
            res.status(200).send({ data: resData, success: true, message: "Create successfully" })
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}

export const remove = (req, res) => {
    modals.Post.findByOneAndRemove({ _id: req?.params?.id, userId: req.me._id })
        .then((resData) => {
            res.status(200).send({ data: null, success: true, message: "Delete successfully" })
        })
        .catch((err) => {
            res.status(400).send({ data: null, success: false, message: err.message })
        })
}