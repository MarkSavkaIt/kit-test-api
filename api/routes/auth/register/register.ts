import express, { Router } from "express";
import mongoose from "mongoose";
import User from "../../../schemas/User/user";

const register = express.Router();

register.get("/", (req, res) => {
  res.status(200).send("Register get works");
});

register.post("/", async (req, res) => {
  const user = new User({
    id: new mongoose.Types.ObjectId(),
    email: "",
    reg_token: "",
    photo_avatar: "",
    phone: "",
    name: "Mark",
    type: "user",
    appointments: [""],
  });
  await user.save((err, success) => {
    if (err) {
      res
        .status(200)
        .send({ message: "User cannot be created : ", error: err });
    }
    res.status(200).send({ message: "User was created", success: success });
  });
});

export default register;
