import { Router } from "express";
import { signupController } from "../controllers/authControllers";

const router = Router();

//User registration
router.post("/user-register", signupController);

export default router;
