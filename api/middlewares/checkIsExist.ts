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
}

export async function checkIsDoctorExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const doctor_email = req.body.email;

  const doctor = await User.find({ email: doctor_email, type: "doctor" });

  if (!doctor.length) {
    res.send({ message: "Doctor is not defined" });
  } else next();
}
