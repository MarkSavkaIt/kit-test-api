import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  date: Date,
  user: mongoose.Types.ObjectId,
  doctor: mongoose.Types.ObjectId,
  active: Boolean,
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

export default Appointments;
