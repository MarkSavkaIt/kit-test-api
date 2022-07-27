import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    id: "uuid",
    email: String,
    reg_token: String,
    photo_avatar: String,
    phone: String,
    name: String,
    type: 'user',
    appointments: [String]
});

const User = mongoose.model("User", userSchema)