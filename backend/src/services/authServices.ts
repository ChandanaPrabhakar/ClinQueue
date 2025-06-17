import Doctor, { DoctorInterface } from "../models/doctorModel";
import User, { UserInterface } from "../models/userModel";
import bcrypt from "bcrypt";

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

    return {
      success: true,
      message: "User registered successfully",
      data: {
        _id: savedData._id,
        fullName: savedData.fullName,
        age: savedData.age,
        phoneNumber: savedData.phoneNumber,
        role: savedData.role,
      },
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

    return {
      success: true,
      message: "login successful",
      data: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        age: existingUser.age,
        role: existingUser.role,
      },
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
      data: {
        _id: savedData._id,
        doctorName,
        specialization,
        qualification,
        experience,
        role,
        availableSlots,
      },
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
    };
  } catch (err) {
    console.error("Error doctor logging in", err);
    throw new Error("Failed to login the doctor");
  }
};
