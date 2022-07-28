import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";
import User from "../../../schemas/User/user";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const register: Router = express.Router();

register.use(express.json()); // if delete this line, req.body dont work. I`m not sure how is it works

register.get("/", (req, res) => {
  // res.status(200).send("Register get works");
  res.status(200).send({ message: "Register get works", date: Date() });
});

register.post("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send({ message: "to register choose /user or /doctor domen" });
});

register.post("/user", (req, res: Response) => {
  console.log(req.body);

  const token = jwt.sign(
    { user_id: user.id, email: user.email },
    "secret key",
    {
      expiresIn: "2h",
    }
  );

  const user = new User({
    id: new mongoose.Types.ObjectId(),
    email: "",
    reg_token: token,
    photo_avatar: "",
    phone: "",
    name: "Mark",
    type: "user",
    appointments: [""],
  });

  user.save((err: any, success: any) => {
    if (err) {
      res
        .status(200)
        .send({ message: "User cannot be created : ", error: err });
    }
    res.status(200).send({ message: "User was created", token });
  });
});

export default register;
