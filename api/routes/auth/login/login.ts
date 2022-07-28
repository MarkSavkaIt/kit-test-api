import express, { Response, Request, Router } from "express";
import User, { IUser } from "../../../schemas/User/user";
import jsonwebtoken from "jsonwebtoken";
import { Error } from "mongoose";
import { checkAuth } from "../../../middlewares/checkAuth";
const jwt = jsonwebtoken;

const login: Router = express.Router();

login.use(express.json());

login.get("/", (req: Request, res: Response) => {
  res.status(200).send("Login get works");
});

login.post("/", checkAuth, (req: Request, res: Response) => {
  res.send("Wellcome");
});

export default login;
