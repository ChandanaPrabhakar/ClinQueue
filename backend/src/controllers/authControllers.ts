import { Request, Response } from "express";
import {
  doctorLoginService,
  doctorRegisterService,
  userLoginService,
  userRegistration,
} from "../services/authServices";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/customRequest";

// User registration controller
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
    res.status(201).json({
      message: result.message,
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//User login controller
export const userLoginController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;
    const result = await userLoginService(phoneNumber, password);

    if (!result.success) {
      res.status(404).json({ message: result.message });
    }

    res.status(200).json({
      message: result.message,
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

//Doctor registration controller
export const doctorRegisterController = async (req: Request, res: Response) => {
  const { id } = req.body.user;

  console.log(id);
  try {
    const {
      doctorName,
      email,
      specialization,
      qualification,
      experience,
      password,
      role,
      availableSlots,
    } = req.body;
    const result = await doctorRegisterService(
      doctorName,
      email,
      specialization,
      qualification,
      experience,
      password,
      role,
      availableSlots
    );
    if (!result.success) {
      res.status(400).json({ message: result.message });
      return;
    }

    res.status(200).json({ message: result.message });
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

//Doctor login controller
export const doctorLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await doctorLoginService(email, password);
    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }
    res.status(200).json({
      message: result.message,
      token: result.token,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};
