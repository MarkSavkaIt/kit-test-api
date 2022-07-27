import mongoose from "mongoose";
import uuid from "node-uuid";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: mongoose.Types.ObjectId,
  email: String,
  reg_token: String,
  photo_avatar: String,
  phone: String,
  name: String,
  type: String,
  appointments: [String],
});

const User = mongoose.model("User", userSchema);

export default User;
