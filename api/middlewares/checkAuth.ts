import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"];
  console.log({ token });

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // @ts-ignore
    jwt.verify(token, "secret key");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
