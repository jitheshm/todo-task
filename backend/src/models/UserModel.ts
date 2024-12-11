
import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;


