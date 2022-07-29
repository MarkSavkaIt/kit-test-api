import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  date: Date,
  user: mongoose.Types.ObjectId,
  doctor: mongoose.Types.ObjectId,
  active: { type: Boolean, default: "false" },
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

export default Appointments;
