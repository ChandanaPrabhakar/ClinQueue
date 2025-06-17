import Doctor, { DoctorInterface } from "../models/doctorModel";

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
