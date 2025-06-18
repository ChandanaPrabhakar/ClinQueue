import Doctor, { DoctorInterface } from "../models/doctorModel";
import User, { UserInterface } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//User registration service
export const userRegistration = async (
  fullName: string,
  age: number,
  phoneNumber: number,
  password: string,
  role: string
) => {
  try {
    const existingUser: number | null = await User.findOne({ phoneNumber });
    if (existingUser) {
      return {
        message: "User already exists, please log in",
        success: "false",
      };
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const userData: UserInterface = new User({
      fullName,
      age,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    const savedData: UserInterface = await userData.save();

    const token = jwt.sign(
      { id: savedData._id, role: savedData.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m" }
    );

    return {
      success: true,
      message: "User registered successfully",
      token,
    };
  } catch (err) {
    console.error("Error in userRegistration service:", err);
    throw new Error("Failed to register user");
  }
};

//User login service
export const userLoginService = async (
  phoneNumber: number,
  password: string
) => {
  try {
    const existingUser: UserInterface | null = await User.findOne({
      phoneNumber,
    });
    if (!existingUser) {
      return {
        success: false,
        message: "User not found, please register",
      };
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m" }
    );

    return {
      success: true,
      message: "login successful",
      token,
    };
  } catch (err) {
    console.error("Login service error", err);
    throw new Error("Login failed due to server error");
  }
};

//Doctor registration service
export const doctorRegisterService = async (
  doctorName: string,
  email: string,
  specialization: string,
  qualification: string,
  experience: number,
  password: string,
  role: string,
  availableSlots: string[]
) => {
  try {
    const existingDoctor: DoctorInterface | null = await Doctor.findOne({
      email,
    });
    if (existingDoctor) {
      return {
        success: false,
        message: "Doctor already exists, please login",
      };
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const doctorData: DoctorInterface = new Doctor({
      doctorName,
      email,
      specialization,
      qualification,
      experience,
      password: hashedPassword,
      role,
      availableSlots,
    });

    const savedData = await doctorData.save();

    return {
      success: true,
      message: "Doctor registered successfully",
    };
  } catch (err) {
    console.error("Error registering doctor", err);
    throw new Error("Failed to register doctor");
  }
};

//Doctor login service
export const doctorLoginService = async (email: string, password: string) => {
  try {
    const existingDoctor: DoctorInterface | null = await Doctor.findOne({
      email,
    });
    if (!existingDoctor) {
      return {
        success: false,
        message: "Doctor not found, please check with admin and register",
      };
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      existingDoctor.password
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { id: existingDoctor._id, role: existingDoctor.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m" }
    );

    return {
      success: true,
      message: "Login successful",
      data: {
        _id: existingDoctor._id,
        doctorName: existingDoctor.doctorName,
        specialization: existingDoctor.specialization,
        qualification: existingDoctor.qualification,
        experience: existingDoctor.experience,
        role: existingDoctor.role,
        availableSlots: existingDoctor.availableSlots,
      },
      token,
    };
  } catch (err) {
    console.error("Error doctor logging in", err);
    throw new Error("Failed to login the doctor");
  }
};
