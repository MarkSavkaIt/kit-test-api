import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  email: string;
  reg_token: string;
  photo_avatar: string;
  phone: string;
  name: string;
  type: string;
  spec?: string;
  free?: boolean;
  appointments: string[];
}

const userSchema = new Schema<IUser>(
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
