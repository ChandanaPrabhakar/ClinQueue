import { Request, Response } from "express";
import {
  allAppointmentsService,
  bookAppointmentService,
  deleteAppointmentService,
  editUserProfileService,
  updateAppointmentService,
} from "../services/userServices";
import { CustomRequest } from "../types/customRequest";

//Book-appointment controller
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
      return;
    }
    res
      .status(201)
      .json({ message: result.message, data: result.saveAppointment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Get all appointments controller
export const allAppointmentsController = async (
  req: CustomRequest,
  res: Response
) => {
  const id = req.user?.id as string;
  try {
    const result = await allAppointmentsService(id);
    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }
    res
      .status(200)
      .json({ message: result.message, data: result.bookedAppointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Delete appointment controller
export const deleteAppointmentController = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.user?.id as string;
  const { appointmentId } = req.params;
  try {
    const result = await deleteAppointmentService(userId, appointmentId);
    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Update appointment controller
export const updateAppointmentController = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.user?.id as string;
  const { appointmentId } = req.params;
  const { timeSlot } = req.body;
  if (!timeSlot) {
    res.status(400).json({ message: "No changes provided" });
    return;
  }
  try {
    const result = await updateAppointmentService(
      userId,
      appointmentId,
      timeSlot
    );
    if (!result.success) {
      res.status(404).json({ message: result.message });
    }
    res
      .status(200)
      .json({ message: result.message, data: result.updateAppointment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Edit user profile controller
export const editUserProfileController = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.user?.id as string;
  const { fullName, age, phoneNumber } = req.body;

  if (!fullName && !age && !phoneNumber) {
    res.json(400).json({ message: "No change provided" });
    return;
  }
  try {
    const result = await editUserProfileService(
      userId,
      fullName,
      age,
      phoneNumber
    );
    if (!result.success) {
      res.status(409).json({ message: result.message });
      return;
    }
    res
      .status(200)
      .json({ message: result.message, data: result.profileUpdate });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
