import mongoose, { Document } from "mongoose";

export interface AppointmentInterface extends Document {
  patientName: string;
  patientAge: number;
  patientPhone: number;
  doctorName: string;
  doctorSpec: string;
  timeSlot: string;
  status: "completed" | "cancelled" | "booked";
  userId: string;
  doctorId: string;
}

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    patientPhone: {
      type: Number,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorSpec: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model<AppointmentInterface>(
  "Appointment",
  AppointmentSchema
);
export default Appointment;
