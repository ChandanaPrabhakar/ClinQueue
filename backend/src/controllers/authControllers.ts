import { Request, Response } from "express";
import { userRegistration } from "../services/authServices";

export const signupController = async (req: Request, res: Response) => {
  const { fullName, age, phoneNumber, password, role } = req.body;
  try {
    const result = await userRegistration(
      fullName,
      age,
      phoneNumber,
      password,
      role
    );

    if (!result.success) {
      res.status(400).json({ message: result.message });
    }
    res.status(201).json({ message: result.message, user: result.data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
