import { Request, Response } from "express";
import { bookAppointmentService } from "../services/userServices";
import { CustomRequest } from "../types/customRequest";

export const bookAppointmentController = async (
  req: CustomRequest,
  res: Response
) => {
  const id = req.user?.id as string;
  const { doctorId, timeSlot } = req.body;
  try {
    const result = await bookAppointmentService(id, doctorId, timeSlot);
    if (!result.success) {
      res.status(400).json({ message: result.message });
    }
    res
      .status(201)
      .json({ message: result.message, data: result.saveAppointment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
