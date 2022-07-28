import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    reg_token: String,
    photo_avatar: String,
    phone: String,
    name: String,
    type: String,
    spec: { type: String, required: false },
    free: { type: Boolean, required: false },
    appointments: [String],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
