import { Router } from "express";
import { bookAppointmentController } from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

//Book-appointment route
router.post("/book-appointment", verifyToken, bookAppointmentController);

export default router;
