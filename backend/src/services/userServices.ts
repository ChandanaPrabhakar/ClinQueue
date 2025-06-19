import Appointment, { AppointmentInterface } from "../models/appointmentModel";
import Doctor, { DoctorInterface } from "../models/doctorModel";
import User, { UserInterface } from "../models/userModel";

//Get user info service
export const getUserInfoService = async (userId: string) => {
  try {
    const userData: UserInterface | null = await User.findById({ _id: userId });
    if (!userData) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      message: "user details sent",
      userInfo: {
        fullName: userData?.fullName,
        age: userData?.age,
        phoneNumber: userData?.phoneNumber,
        role: userData?.role,
      },
    };
  } catch (err) {
    console.error("Error fetching user information");
    throw new Error("Failed to fetch user info");
  }
};

//Book-appointment service
export const bookAppointmentService = async (
  id: string,
  doctorId: string,
  timeSlot: string
) => {
  try {
    const userData: UserInterface | null = await User.findById({ _id: id });
    const doctorData: DoctorInterface | null = await Doctor.findById({
      _id: doctorId,
    });

    const existingAppointments: number = await Appointment.countDocuments({
      doctorId: doctorId,
      timeSlot: timeSlot,
      status: "booked",
    });

    if (existingAppointments >= 4) {
      return {
        success: false,
        message: "This Slot is Fully Booked. Please Choose Another Slot.",
      };
    }

    if (!userData || !doctorData) {
      return {
        success: false,
        message: "Slot Not Available",
      };
    }

    const existingAppointmentSameDoctor = await Appointment.findOne({
      userId: id,
      doctorId: doctorId,
    });

    const existingAppointmentSameTime = await Appointment.findOne({
      userId: id,
      timeSlot,
    });

    if (existingAppointmentSameDoctor || existingAppointmentSameTime) {
      return {
        success: false,
        message:
          "Appointment Already Exists. Check 'My Appointments' and Try Again.",
      };
    }
    const appointmentData: AppointmentInterface = new Appointment({
      patientName: userData?.fullName,
      patientAge: userData?.age,
      patientPhone: userData?.phoneNumber,
      doctorName: doctorData?.doctorName,
      doctorSpec: doctorData?.specialization,
      timeSlot,
      userId: id,
      doctorId,
    });

    const saveAppointment = await appointmentData.save();

    return {
      success: true,
      message: "appointment booked successfully",
      saveAppointment,
    };
  } catch (err) {
    console.error("Error booking appointment");
    throw new Error("Failed to book appointment");
  }
};

//Get all appointment service
export const allAppointmentsService = async (id: string) => {
  try {
    const bookedAppointments: AppointmentInterface[] | null =
      await Appointment.find({ userId: id });

    if (!bookedAppointments) {
      return {
        success: false,
        message: "No Appointments Found",
      };
    }

    return {
      success: true,
      message: "Fetched all booked appointments",
      bookedAppointments,
    };
  } catch (err) {
    console.error("Error fetching appointments");
    throw new Error("Failed to load appointments");
  }
};

//Delete appointment service
export const deleteAppointmentService = async (
  userId: string,
  doctorId: string
) => {
  try {
    const appointment: AppointmentInterface | null =
      await Appointment.findOneAndDelete({
        doctorId: doctorId,
        userId: userId,
      });
    if (appointment) {
      return {
        success: true,
        message: "Appointment cancelled",
      };
    } else {
      return {
        success: false,
        message: "appointment not found",
      };
    }
  } catch (err) {
    console.error("Error deleting the appointment");
    throw new Error("Failed to delete appointment");
  }
};

//Update appointment service
export const updateAppointmentService = async (
  userId: string,
  doctorId: string,
  timeSlot: string
) => {
  try {
    const updateAppointment: AppointmentInterface | null =
      await Appointment.findOneAndUpdate(
        { doctorId: doctorId, userId: userId },
        { $set: { timeSlot: timeSlot } },
        { new: true }
      );
    if (!updateAppointment) {
      return {
        success: false,
        message: "Appointment not found",
      };
    }
    return {
      success: true,
      message: "Appointment Rescheduled Successfully",
      updateAppointment,
    };
  } catch (err) {
    console.error("Error updating the appointment");
    throw new Error("Failed to update appointment");
  }
};

//Get available slots service
export const getAvailableSlotsService = async (doctorId: string) => {
  try {
    const availableSlotsDetails = await Doctor.findOne({ _id: doctorId });
    if (!availableSlotsDetails) {
      return {
        success: false,
        message: "Doctor not found",
      };
    }
    return {
      success: true,
      message: "Available slots sent",
      availableSlotsData: availableSlotsDetails.availableSlots,
    };
  } catch (err) {
    console.error("Error fetching available slots", err);
    throw new Error("Failed to fetch available slots");
  }
};

//Filter doctor service
export const filterDoctorService = async (specialization: string) => {
  try {
    const filter = { specialization: new RegExp(`^${specialization}$`, "i") };
    const doctor = await Doctor.find(filter).select("-password");
    if (!doctor) {
      return {
        success: false,
        message: "No doctor found",
      };
    }
    return {
      success: true,
      message: "Doctor found successfully",
      doctor,
    };
  } catch (err) {
    console.error("Error filtering the doctor");
    throw new Error("Failed to filter doctor");
  }
};

//Get all doctors service
export const getAllDoctorsService = async () => {
  try {
    const doctors: DoctorInterface[] = await Doctor.find();
    if (!doctors || doctors.length === 0) {
      return {
        success: false,
        message: "No doctors found",
      };
    }
    return {
      success: true,
      message: "Doctors fetch successful",
      data: doctors,
    };
  } catch (err) {
    console.error("Error fetching doctors", err);
    throw new Error("failed to fetch doctors");
  }
};

//Get all slot usage service
export const getSlotUsageService = async (doctorId: string) => {
  try {
    const slots = await Appointment.aggregate([
      { $match: { doctorId: doctorId, status: "booked" } },
      { $group: { _id: "$timeSlot", count: { $sum: 1 } } },
    ]);

    const usage: Record<string, number> = {};
    slots.forEach((slot) => {
      usage[slot._id] = slot.count;
    });

    return {
      success: true,
      message: "slots aggregated",
      usage,
    };
  } catch (err) {
    console.error("Error fetching slot usage data");
    throw new Error("Failed to fetch slot usage");
  }
};

//Edit user profile service
export const editUserProfileService = async (
  userId: string,
  fullName: string,
  age: number,
  phoneNumber: number
) => {
  try {
    const user: UserInterface | null = await User.findById(userId);
    const updates: Partial<{
      fullName: string;
      age: number;
      phoneNumber: number;
    }> = {};

    if (fullName && fullName !== user?.fullName) {
      updates.fullName = fullName;
    }

    if (age && age !== user?.age) {
      updates.age = age;
    }
    if (phoneNumber && phoneNumber !== user?.phoneNumber) {
      const existingPhoneUser = await User.findOne({
        phoneNumber,
        _id: { $ne: userId },
      });

      if (existingPhoneUser) {
        return {
          success: false,
          message:
            "Phone number already exists. Please use a different number.",
        };
      }
      updates.phoneNumber = phoneNumber;
    }

    if (Object.keys(updates).length === 0) {
      return {
        success: false,
        message: "No changes detected to update",
      };
    }

    const profileUpdate = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    return {
      success: true,
      message: "profile updated successfully",
      profileUpdate,
    };
  } catch (err) {
    console.error("Error updating profile", err);
    throw new Error("Failed to update profile");
  }
};
