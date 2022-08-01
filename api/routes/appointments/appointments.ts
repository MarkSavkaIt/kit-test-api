import express, { Request, Response, Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import Appointments from "../../schemas/Appointments/appointments";
import jsonwebtoken from "jsonwebtoken";
import User from "../../schemas/User/user";
import {
  checkDoctorType,
  checkUserType,
} from "../../middlewares/checkUserType";
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
    // @ts-ignore
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

    const user = await User.findOne({ _id: user_id });
    // @ts-ignore
    user.appointments.push(appointment._id);
    await User.findOneAndUpdate(
      { _id: user_id },
      // @ts-ignore
      { appointments: user.appointments }
    );

    const doctor = await User.findOne({ _id: doctor_id });
    // @ts-ignore
    doctor.appointments.push(appointment._id);
    await User.findOneAndUpdate(
      { _id: doctor_id },
      // @ts-ignore
      { appointments: doctor.appointments }
    );

    res.send({ message: "Appointment have created", appointment });
  }
);

appointment.get(
  "/approve",
  checkAuth,
  checkDoctorType,
  async (req: Request, res: Response) => {
    const token = req.headers["x-access-token"];
    // @ts-ignore
    const deprecated = jwt.verify(token, "secret key");
    // @ts-ignore
    const doctor = await User.findOne({ _id: deprecated.user_id });
    if (doctor.appointments.length) {
      const appointments = await Appointments.find()
        .where("_id")
        .in(doctor.appointments);
      console.log({ appointments });
      res.send({ message: "Your appointments", appointments });
    } else {
      res.send({ message: "Appointments not found" });
    }
  }
);

appointment.post(
  "/approve",
  checkAuth,
  checkDoctorType,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      res.send({ message: "You forgot paste id" });
      return;
    }
    await Appointments.findOneAndUpdate({ _id: id }, { active: true });
    res.send({ message: "Approve update" });
  }
);

export default appointment;
