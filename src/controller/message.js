import NodeCache from "node-cache";
import { modals } from "../model";

const myCache = new NodeCache();

export const getAll = (req, res) => {
  let value = myCache.get("msg");
  if (value) {
    res
      .status(200)
      .send({ message: "come from cache", data: value, success: true });
  } else {
    modals.Message.find({ senderId: req?.me?._id })
      .then((resData) => {
        myCache.set("msg", resData, 5);
        res.status(200).send({
          message: "come from database",
          data: resData,
          success: true,
        });
      })
      .catch((err) => {
        res
          .status(400)
          .send({ data: null, success: false, message: err.message });
      });
  }
};

export const sendMessage = (req, res) => {
  let input = req?.body;
  input.senderId = req?.me?._id;

  modals.Message.create(input)
    .then((resData) => {
      res.status(200).send({ data: resData, success: true, message: "" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

<<<<<<< HEAD
export const remove = (req, res) => {
  modals.Message.findOneAndDelete({
    _id: req?.params?.id,
    senderId: req.me._id,
  })
    .then((resData) => {
      if (!resData) {
        return res
          .status(404)
          .send({ success: false, message: "Message not found" });
      }
      res
        .status(200)
        .send({ data: resData, success: true, message: "Delete successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};
=======

export const deleteMessage = (req, res) => {
  modals.Message.findByIdAndDelete({ _id: req?.params?.id })
      .then((resData) => {
          res.status(200).send({ data: resData, success: true, message: "Delete successfully" })
      })
      .catch((err) => {
          res.status(400).send({ data: null, success: false, message: err.message })
      })
}
>>>>>>> 4b1154fa5e1cb9125206041c0b093b17ec9f92b2
