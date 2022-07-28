import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./api/routes/auth/auth";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const conn = mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Conneted to MongoDB"))
  .catch((err) =>
    console.log({ message: "Error connect to MongoDB", err: err })
  );

app.use("/auth", auth);
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/apple", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server run at https://localhost:${port}`);
});
