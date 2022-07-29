import { NextFunction, Request, Response } from "express";

export function checkPropsDataUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, photo_avatar, phone, name } = req.body;
  if (email && photo_avatar && phone && name) {
    next();
  } else {
    const str = [];
    email ? "" : str.push("email");
    photo_avatar ? "" : str.push("photo_avatar");
    phone ? "" : str.push("phone");
    name ? "" : str.push("name");
    res
      .status(400)
      .send({ message: "You forgot some keys", keys: str.join(" ") });
  }
}

export function checkPropsDataDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, photo_avatar, phone, name, spec, free } = req.body;
  if (
    email &&
    photo_avatar &&
    phone &&
    name &&
    spec &&
    typeof free === "boolean"
  ) {
    next();
  } else {
    const str = [];
    email ? "" : str.push("email");
    photo_avatar ? "" : str.push("photo_avatar");
    phone ? "" : str.push("phone");
    name ? "" : str.push("name");
    spec ? "" : str.push("spec");
    typeof free === "boolean" ? "" : str.push("free");

    res
      .status(400)
      .send({ message: "You forgot some keys", keys: str.join(" ") });
  }
}

export function checkPropsDataAppointment(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { email, date } = req.body;
  if (email && date) {
    next();
  } else {
    const str = [];
    email ? "" : str.push("email");
    date ? "" : str.push("date");
    res
      .status(400)
      .send({ message: "You forgot some keys", keys: str.join(" ") });
  }
}
