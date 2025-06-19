import { Router } from "express";
import {
  allAppointmentsController,
  bookAppointmentController,
  deleteAppointmentController,
  editUserProfileController,
  filterDoctorController,
  getAvailableSlotsController,
  getUserInfoController,
  updateAppointmentController,
} from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

//Get user info
router.get("/get-user", verifyToken, getUserInfoController);

//Book-appointment route
router.post("/book-appointment", verifyToken, bookAppointmentController);

//Get all appointments route
router.get("/appointments", verifyToken, allAppointmentsController);

//Delete appointment route
router.delete(
  "/appointments/doctorId/:doctorId",
  verifyToken,
  deleteAppointmentController
);

//Update appointment route
router.patch(
  "/appointments/doctorId/:doctorId",
  verifyToken,
  updateAppointmentController
);

//Get available slots
router.get(
  "/doctors/doctorId/:doctorId",
  verifyToken,
  getAvailableSlotsController
);

//Filter doctor route
router.get("/doctor", verifyToken, filterDoctorController);

//Edit user profile
router.patch("/profile-update", verifyToken, editUserProfileController);

export default router;
