import mongoose, { Document } from "mongoose";

export interface DoctorInterface extends Document {
  doctorName: string;
  email: string;
  specialization: string;
  qualification: string;
  experience: number;
  password: string;
  role?: "doctor";
  availableSlots?: string[];
}

const DoctorSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "doctor",
    },
    availableSlots: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<DoctorInterface>("Doctor", DoctorSchema);
export default Doctor;
