import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema({
  id: mongoose.Types.ObjectId,
  email: String,
  reg_token: String,
  photo_avatar: String,
  phone: String,
  name: String,
  type: String,
  spec: String,
  free: Boolean,
  appointments_accepted: [String],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
