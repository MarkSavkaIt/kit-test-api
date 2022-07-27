import express, { Router } from "express";
import login from "./login/login";
import register from "./register/register";

const auth: Router = express.Router();

auth.get("/", (req, res) => {
  res.status(200).send("Auth already works");
});

auth.use("/login", login);
auth.use("/register", register);

export default auth;
