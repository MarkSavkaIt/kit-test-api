import express, { Router } from "express";
import login from "./login/login";

const auth: Router = express.Router();

auth.get("/", (req, res) => {
  res.status(200).send("Auth already works");
});

auth.use("/login", login);

export default auth;
