import { modals } from "../model";

export const getPendingRequest = async (req, res) => {
  modals.Follower.find({ reciverId: req?.user?.id, status: "pending" })
    .then(async (resData) => {
      res
        .status(200)
        .send({ data: resData, success: true, message: "Create succesfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ data: null, success: false, message: err.message });
    });
};

export const sendRequest = async (req, res) => {
  let input = req?.body;
  input.senderId = req?.me?.id;

  const match = await modals?.Follower?.findOne(input);
  if (match) {
    return res.status(400).send({ data: null, success: false, message: "already request sent" })
  };

  const user = await modals?.User?.findById(input.reciverId);
  if (!user?.isPrivate) {
    user.followers = user.followers + 1;
    user.save();
    input.status = "accept";
    req.me.following = req?.me?.following + 1;
    req?.me?.save();
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

export const requestHandler = async (req, res) => {
  const input = req.body;

  if (input.status === "reject") {
    modals.Follower.findOneAndDelete({ senderId: input?.senderId, reciverId: req?.me?._id }).then((ress) => {
      res
        .status(200)
        .send({ data: "", success: true, message: "Rejected succesfully" });
    });
  } else {
    modals.Follower.findOneAndUpdate({ senderId: input?.senderId, reciverId: req?.me?._id }, { status: "accept" })
      .then(async (resData) => {
        await modals.User.findByIdAndUpdate(input.senderId, {
          $inc: { following: 1 },
        });
        req.me.followers = req?.me?.followers + 1;
        req.me.save();

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

export const getAll = async (req, res) => {
  try {
    const { userId } = req.body

    const following = await modals?.Follower?.find({
      senderId: userId,// reciver id 
      status: "accept"
    })
    const followers = await modals?.Follower?.find({
      reciverId: userId, // sender id
      status: "accept"
    })

    res.status(200).send({
      following: following,
      followers: followers,
      message: "Accepted succesfully",
      success: true,
    })
  } catch (err) {
    res.status(400).send({
      following: null,
      followers: null,
      message: err.message,
      success: false,
    })
  }
}
