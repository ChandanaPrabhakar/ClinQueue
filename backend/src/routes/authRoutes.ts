import { Router } from "express";
import {
  signupController,
  userLoginController,
} from "../controllers/authControllers";

const router = Router();

//User registration
router.post("/user-register", signupController);
//User login
router.post("/user-login", userLoginController);

export default router;
