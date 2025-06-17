import { Router } from "express";
import {
  allAppointmentsController,
  bookAppointmentController,
  deleteAppointmentController,
  updateAppointmentController,
} from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

//Book-appointment route
router.post("/book-appointment", verifyToken, bookAppointmentController);

//Get all appointments route
router.get("/appointments", verifyToken, allAppointmentsController);

//Delete appointment route
router.delete(
  "/appointments/appointmentId/:appointmentId",
  verifyToken,
  deleteAppointmentController
);

//Update appointment route
router.put(
  "/appointments/appointmentId/:appointmentId",
  verifyToken,
  updateAppointmentController
);

export default router;
