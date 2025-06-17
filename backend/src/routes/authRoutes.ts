import { Router } from "express";
import {
  doctorRegisterController,
  signupController,
  userLoginController,
} from "../controllers/authControllers";

const router = Router();

//User registration
router.post("/user-register", signupController);
//User login
router.post("/user-login", userLoginController);
//Doctor registration (admin access only)
router.post("/doctor-register", doctorRegisterController);

export default router;
