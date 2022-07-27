import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./api/routes/auth/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server run at https://localhost:${port}`);
});
