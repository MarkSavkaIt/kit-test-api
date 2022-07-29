import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../schemas/User/user";

const jwt = jsonwebtoken;

export async function checkUserType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["x-access-token"];
  // @ts-ignore
  const deprecated = jwt.verify(token, "secret key");
  const [user] = await User.find({ _id: deprecated.user_id });
  if (user.type !== "user") {
    res.send({ message: "Only for user" });
  } else next();
}

export async function checkDoctorType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["x-access-token"];
  // @ts-ignore
  const deprecated = jwt.verify(token, "secret key");
  const [user] = await User.find({ _id: deprecated.user_id });
  if (user.type !== "doctor") {
    res.send({ message: "Only for doctor" });
  } else next();
}
