import { Router } from "express";
import {
  doctorLoginController,
  doctorRegisterController,
  signupController,
  userLoginController,
} from "../controllers/authControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

//User registration
router.post("/user-register", signupController);
//User login
router.post("/user-login", userLoginController);
//Doctor registration (admin access only)
router.post("/doctor-register", verifyToken, doctorRegisterController);
//Doctor login (admin and doctor access)
router.post("/doctor-login", doctorLoginController);

export default router;
