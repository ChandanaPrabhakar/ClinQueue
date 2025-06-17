import User, { UserInterface } from "../models/userModel";
import bcrypt from "bcrypt";

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

export const userLoginService = async (
  phoneNumber: number,
  password: string
) => {
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (!existingUser) {
      return {
        success: false,
        message: "User not found, please register",
      };
    }

    const isPasswordValid = await bcrypt.compare(
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
