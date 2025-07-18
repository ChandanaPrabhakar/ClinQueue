import { Response } from "express";
import { CustomRequest } from "../types/customRequest";
import {
  allAppointmentService,
  editAvailableSlotsService,
  getDoctorProfileService,
  updateAppointmentStatusService,
} from "../services/doctorServices";

//Get doctor details controller
export const getDoctorProfileController = async (
  req: CustomRequest,
  res: Response
) => {
  const doctorId = req.user?.id as string;
  try {
    const result = await getDoctorProfileService(doctorId);
    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: result.message, data: result.data });
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

//edit available slot controller
export const editAvailableSlotsController = async (
  req: CustomRequest,
  res: Response
) => {
  const doctorId = req.user?.id as string;
  const { timeSlots } = req.body;

  if (!timeSlots) {
    res.status(400).json({ message: "No changes provided" });
    return;
  }

  try {
    const result = await editAvailableSlotsService(doctorId, timeSlots);
    res.status(200).json({ message: result.message, data: result.doctorData });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Get all appointments controller
export const allAppointmentsController = async (
  req: CustomRequest,
  res: Response
) => {
  const doctorId = req.user?.id as string;
  try {
    const result = await allAppointmentService(doctorId);
    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }
    res
      .status(200)
      .json({ message: result.message, data: result.appointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update status of appointment
export const updateAppointmentStatusController = async (
  req: CustomRequest,
  res: Response
) => {
  const { appointmentId } = req.params;
  const { status } = req.body;
  try {
    const result = await updateAppointmentStatusService(appointmentId, status);
    if (!result.success) {
      res.status(400).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: result.message, data: result.updated });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
