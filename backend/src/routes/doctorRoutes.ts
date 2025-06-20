import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeVerify } from "../middlewares/roleMiddleware";
import {
  editAvailableSlotsController,
  getDoctorProfileController,
  updateAppointmentStatusController,
} from "../controllers/doctorControllers";
import { allAppointmentsController } from "../controllers/doctorControllers";

const router = Router();

//Get doctor route
router.get(
  "/doctor-profile",
  verifyToken,
  authorizeVerify("doctor", "admin"),
  getDoctorProfileController
);

//edit availability slot
router.patch(
  "/available-slots",
  verifyToken,
  authorizeVerify("doctor", "admin"),
  editAvailableSlotsController
);

//get all appointments
router.get(
  "/appointments",
  verifyToken,
  authorizeVerify("doctor", "admin"),
  allAppointmentsController
);

//update appointment status
router.patch(
  "/appointments/appointmentId/:appointmentId",
  verifyToken,
  authorizeVerify("doctor", "admin"),
  updateAppointmentStatusController
);

export default router;
