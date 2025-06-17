import { Router } from "express";
import {
  doctorLoginController,
  doctorRegisterController,
  signupController,
  userLoginController,
} from "../controllers/authControllers";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeVerify } from "../middlewares/roleMiddleware";

const router = Router();

//User registration (all can access)
router.post("/user-register", signupController);
//User login (all can access)
router.post("/user-login", userLoginController);
//Doctor registration (admin access only)
router.post(
  "/doctor-register",
  verifyToken,
  authorizeVerify("admin"),
  doctorRegisterController
);
//Doctor login (admin and doctor access)
router.post(
  "/doctor-login",
  verifyToken,
  authorizeVerify("admin", "doctor"),
  doctorLoginController
);

export default router;
