import Appointment, { AppointmentInterface } from "../models/appointmentModel";
import Doctor, { DoctorInterface } from "../models/doctorModel";
import User, { UserInterface } from "../models/userModel";

//Book-appointment service
export const bookAppointmentService = async (
  id: string,
  doctorId: string,
  timeSlot: string
) => {
  try {
    const userData: UserInterface | null = await User.findById(id);
    const doctorData: DoctorInterface | null = await Doctor.findById(doctorId);

    if (!userData || !doctorData) {
      return {
        success: false,
        message: "",
      };
    }

    const existingAppointmentSameDoctor = await Appointment.findOne({
      doctorName: doctorData.doctorName,
    });

    const existingAppointmentSameTime = await Appointment.findOne({
      patientPhone: userData.phoneNumber,
      timeSlot,
    });

    if (existingAppointmentSameDoctor || existingAppointmentSameTime) {
      return {
        success: false,
        message:
          "Appointment already exists. Check 'My Appointments' and try again.",
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

    console.log(bookedAppointments);
    if (!bookedAppointments) {
      return {
        success: false,
        message: "No appointments found",
      };
    }

    return {
      success: true,
      message: "Fetched all booked appointments",
      bookedAppointments,
    };
  } catch (err) {
    console.error("Error fetching appointments");
    throw new Error("Failed to get all appointments");
  }
};
