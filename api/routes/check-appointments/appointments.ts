import express, { Request, Response, Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import Appointments from "../../schemas/Appointments/appointments";
import jsonwebtoken from "jsonwebtoken";
import User from "../../schemas/User/user";
import { checkUserType } from "../../middlewares/checkUserType";
import { checkPropsDataAppointment } from "../../middlewares/checkPropsData";
import { checkIsDoctorExist } from "../../middlewares/checkIsExist";

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

appointment.use(express.json());

appointment.post(
  "/",
  checkAuth,
  checkUserType,
  checkPropsDataAppointment,
  checkIsDoctorExist,
  async (req: Request, res: Response) => {
    const { email: doctor_email, date } = req.body;
    const { _id: doctor_id } = await User.findOne({
      email: doctor_email,
      type: "doctor",
    });
    const token = req.headers["x-access-token"];
    // @ts-ignore
    const { user_id } = jwt.verify(token, "secret key");

    const appointment = new Appointments({
      user: user_id,
      doctor: doctor_id,
      date,
    });

    await appointment.save();
    res.send({ message: "Appointment have created", appointment });
  }
);

export default appointment;
