import { Router } from "express";
import {
  allAppointmentsController,
  bookAppointmentController,
  deleteAppointmentController,
  editUserProfileController,
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
router.patch(
  "/appointments/appointmentId/:appointmentId",
  verifyToken,
  updateAppointmentController
);

//Edit user profile
router.patch("/profile-update", verifyToken, editUserProfileController);

export default router;
