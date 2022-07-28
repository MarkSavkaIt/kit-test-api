import express, { Router } from "express";

const login: Router = express.Router();

login.get("/", (req, res) => {
  res.status(200).send("Login get works");
});

export default login;
