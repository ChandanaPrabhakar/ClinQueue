import { Router } from "express";
import {
  allAppointmentsController,
  bookAppointmentController,
} from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

//Book-appointment route
router.post("/book-appointment", verifyToken, bookAppointmentController);

//Get all appointments route
router.get("/appointments", verifyToken, allAppointmentsController);

export default router;
