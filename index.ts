import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./api/routes/auth/auth";
import mongoose from "mongoose";
import appointment from "./api/routes/appointments/appointments";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

const conn = mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Conneted to MongoDB"))
  .catch((err) =>
    console.log({ message: "Error connect to MongoDB", err: err })
  );

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", auth);

app.use("/appointments", appointment);

app.listen(port, () => {
  console.log(`⚡️[server]: Server run at https://localhost:${port}`);
});
