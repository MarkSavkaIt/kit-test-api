import express, { Request, Response, Router } from "express";
import User from "../../../schemas/User/user";
import jsonwebtoken from "jsonwebtoken";
import {
  checkPropsDataDoctor,
  checkPropsDataUser,
} from "../../../middlewares/checkPropsData";
import { checkIsEmailExist } from "../../../middlewares/checkIsExistEmail";
const jwt = jsonwebtoken;

const register: Router = express.Router();

register.use(express.json()); // if delete this line, req.body dont work. I`m not sure how is it works

register.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Register get works", date: Date() });
});

register.post("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send({ message: "to register choose /user or /doctor domen" });
});

register.post(
  "/user",
  checkPropsDataUser,
  checkIsEmailExist,
  (req: Request, res: Response) => {
    const { email, photo_avatar, phone, name } = req.body;

    const user = new User({
      email,
      reg_token: "",
      photo_avatar,
      phone,
      name,
      type: "user",
      appointments: [],
    });

    const token: any = jwt.sign(
      { user_id: user._id, email: email },
      "secret key",
      {
        expiresIn: "2min",
      }
    );

    user.reg_token = token;

    user.save((err: any, success: any) => {
      if (err) {
        res
          .status(200)
          .send({ message: "User cannot be created : ", error: err });
      }
      res.status(200).send({ message: "User was created", token, user });
    });
  }
);

register.post(
  "/doctor",
  checkPropsDataDoctor,
  checkIsEmailExist,
  (req: Request, res: Response) => {
    const { email, photo_avatar, phone, name, spec, free } = req.body;

    const user = new User({
      email,
      reg_token: "",
      photo_avatar,
      phone,
      name,
      type: "doctor",
      spec,
      free,
      appointments: [],
    });

    const token: any = jwt.sign(
      { user_id: user._id, email: email },
      "secret key",
      {
        expiresIn: "2h",
      }
    );

    user.reg_token = token;

    user.save((err: any, success: any) => {
      if (err) {
        res
          .status(200)
          .send({ message: "Doctor cannot be created : ", error: err });
      }
      res.status(200).send({ message: "Doctor was created", token, user });
    });
  }
);

export default register;
