import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import User from "../schemas/User/user";

export function checkIsEmailExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  User.findOne({ email }, (err: Error, success: any) => {
    if (err) {
      res.status(400).send({ message: "Server crash" });
    } else if (!success) {
      next();
    } else {
      res.status(409).send({ message: "Email already exist" });
    }
  });
  // if (email) {
  // next();
  // } else res.status(400).send({ message: "You forgot some keys" });
}
