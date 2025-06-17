import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeVerify } from "../middlewares/roleMiddleware";
import { editAvailableSlotsController } from "../controllers/doctorControllers";

const router = Router();

//edit availability slot
router.patch(
  "/available-slots/doctorId/:doctorId",
  verifyToken,
  authorizeVerify("doctor", "admin"),
  editAvailableSlotsController
);

export default router;
