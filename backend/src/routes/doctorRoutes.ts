import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeVerify } from "../middlewares/roleMiddleware";
import { editAvailableSlotsController } from "../controllers/doctorControllers";
import { allAppointmentsController } from "../controllers/doctorControllers";

const router = Router();

//edit availability slot
router.patch(
  "/available-slots/doctorId/:doctorId",
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
  authorizeVerify("doctor", "admin")
);

export default router;
