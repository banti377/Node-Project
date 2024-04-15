import modals from "../model";

export const getPendingRequest = async (req, res) => {
  modals.Follower.find({ reciverId: req?.me?._id, status: "pending" })
    .then(async (resData) => {
      res
        .status(200)
        .send({ data: resData, success: true, message: "Request pending" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

export const sendRequest = async (req, res) => {
  let input = req?.body;
  input.senderId = req?.me?._id;

  const match = await modals.Follower.findOne(input);
  if (match) throw new Error("You already sent request");

  const user = await modals.Follower.findById(input.reciverId);
  if (!user.isPrivate) {
    user.followers = user.followers + 1;
    user.save();
    input.status = "accept";
    me.following = me?.following + 1;
    me.save();
  }

  modals.Follower.create(input)
    .then(async (resData) => {
      res.status(200).send({
        data: resData,
        success: true,
        message: "Request send succesfully",
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

export const reqHandler = (req, res) => {
  const input = req?.body;

  if (input.status === "reject") {
    modals.Follower.findByIdAndDelete(input.requestId).then((resData) => {
      res
        .status(200)
        .send({ data: resData, success: true, message: "Reject Succesfully" });
    });
  } else {
    modals.Follower.findById(input.requestId)
      .then((resData) => {
        modals.User.findByIdAndUpdate(input.reciverId, {
          following: { $inc: 1 },
        });
        me.followers = me?.follower + 1;
        me.save();

        res.status(200).send({
          data: resData,
          success: true,
          message: "Accepted succesfully",
        });
      })
      .catch((err) => {
        res
          .status(400)
          .send({ data: null, success: false, message: err.message });
      });
  }
};
