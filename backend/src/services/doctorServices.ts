import Appointment, { AppointmentInterface } from "../models/appointmentModel";
import Doctor, { DoctorInterface } from "../models/doctorModel";

//Get doctor details service
export const getDoctorProfileService = async (doctorId: string) => {
  try {
    const doctorProfile: DoctorInterface | null = await Doctor.findById({
      _id: doctorId,
    });
    if (!doctorProfile) {
      return {
        success: false,
        message: "Details Not Found",
      };
    }
    return {
      success: true,
      message: "Doctor Profile Loaded",
      data: doctorProfile,
    };
  } catch (error) {
    console.error("Error loading doctor profile");
    throw new Error("Failed to load doctor profile");
  }
};

//edit available slots
export const editAvailableSlotsService = async (
  doctorId: string,
  availableSlots: string[]
) => {
  try {
    const doctorData: DoctorInterface | null = await Doctor.findOneAndUpdate(
      { _id: doctorId },
      { $set: { availableSlots } },
      { new: true }
    );

    return {
      success: true,
      message: "Time slots updated successfully",
      doctorData,
    };
  } catch (err) {
    console.error("Error updating time slots", err);
    throw new Error("Failed to update time slot");
  }
};

//Get all appointments service
export const allAppointmentService = async (doctorId: string) => {
  try {
    const appointments: AppointmentInterface[] | null = await Appointment.find({
      doctorId,
    });
    if (!appointments) {
      return {
        success: false,
        message: "No appointments found",
      };
    }

    return {
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    };
  } catch (err) {
    console.error("Error fetching appointments", err);
    throw new Error("Failed to fetch appointments");
  }
};

//update appointment status
export const updateAppointmentStatusService = async (
  appointmentId: string,
  status: "completed" | "cancelled"
) => {
  try {
    const validStatuses = ["completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { status } },
      { new: true }
    );

    return {
      success: true,
      message: "Status updated",
      updated,
    };
  } catch (err) {
    console.error("Error updating appointment", err);
    throw new Error("Failed to update appointment");
  }
};
