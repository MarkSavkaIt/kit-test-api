import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./api/routes/auth/auth";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const conn = mongoose.connect("mongodb://localhost:27017/test");

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server run at https://localhost:${port}`);
});
