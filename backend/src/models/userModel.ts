import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  fullName: string;
  age: number;
  phoneNumber: number;
  password: string;
  role?: "user";
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
