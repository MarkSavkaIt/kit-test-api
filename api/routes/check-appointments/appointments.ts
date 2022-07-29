import express, { Request, Response, Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import Appointments from "../../schemas/Appointments/appointments";
import jsonwebtoken from "jsonwebtoken";
import User from "../../schemas/User/user";
import { checkUserType } from "../../middlewares/checkUserType";

const jwt = jsonwebtoken;

const appointment: Router = express.Router();

appointment.get("/", checkAuth, async (req: Request, res: Response) => {
  const token = req.headers["x-access-token"];
  // @ts-ignore
  const deprecated = jwt.verify(token, "secret key");
  const appointment = await Appointments.find({
    // @ts-ignore
    user: deprecated.user_id,
  });
  res.send({ message: "Appointment works", appointment });
});

appointment.get(
  "/doctors",
  checkAuth,
  checkUserType,
  async (req: Request, res: Response) => {
    const doctors = await User.find({ type: "doctor", free: "true" });
    if (doctors) {
      res.status(200).send({
        doctors: doctors.map((item) => {
          return { name: item.name, email: item.email };
        }),
      });
    } else {
      res.send({ message: "Doctors not found" });
    }
  }
);

appointment.post("/", checkAuth, (req: Request, res: Response) => {
  res.send("post works");
});

export default appointment;
