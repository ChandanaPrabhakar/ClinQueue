import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/api";
import toast from "react-hot-toast";

interface Appointment {
  _id: string;
  patientName: string;
  patientAge: number;
  patientPhone: number;
  timeSlot: string;
  status: "completed" | "cancelled" | "booked";
}

const DoctorAppointmentCards = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get("/doctor/appointments");
        const allAppointments = response.data?.data || [];

        // Filter out completed appointments initially
        const filtered = allAppointments.filter(
          (appt: Appointment) => appt.status !== "completed"
        );

        setAppointments(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments");
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const markAsCompleted = async (id: string) => {
    try {
      await axiosInstance.patch(`/doctor/appointments/appointmentId/${id}`, {
        status: "completed",
      });
      toast.success("Marked as Completed");

      // Remove completed appointment from UI
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const filteredAppointments = selectedSlot
    ? appointments.filter(
        (appt) => appt.timeSlot === selectedSlot && appt.status !== "completed"
      )
    : appointments.filter((appt) => appt.status !== "completed");

  const availableSlots = Array.from(
    new Set(appointments.map((appt) => appt.timeSlot))
  );

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!filteredAppointments.length)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center text-lg font-bold w-[50%] border border-primary bg-secondary/50 text-primary px-5 py-3 rounded-3xl">
          No appointments found
        </div>
      </div>
    );

  return (
    <div className="p-6">
      {/* Time Slot Filter */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedSlot("")}
          className={`px-4 py-2 rounded-full border backdrop-blur-lg cursor-pointer ${
            !selectedSlot
              ? "bg-primary text-bg-primary"
              : "bg-bg-primary text-primary"
          }`}
        >
          All Slots
        </button>
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`px-4 py-2 rounded-full border cursor-pointer ${
              selectedSlot === slot
                ? "bg-primary text-bg-primary"
                : "bg-transparent backdrop-blur-lg text-primary"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appt) => (
          <div
            key={appt._id}
            className="border rounded-3xl backdrop-blur-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-primary truncate hover:whitespace-normal hover:overflow-visible hover:text-clip cursor-pointer">
                {appt.patientName} (Age: {appt.patientAge})
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  appt.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {appt.status}
              </span>
            </div>

            <div className="text-sm space-y-2 text-secondary">
              <p>
                <strong>Time Slot:</strong> {appt.timeSlot}
              </p>
              <p>
                <strong>Phone:</strong> {appt.patientPhone}
              </p>
            </div>

            {appt.status === "booked" && (
              <button
                onClick={() => markAsCompleted(appt._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition"
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointmentCards;
