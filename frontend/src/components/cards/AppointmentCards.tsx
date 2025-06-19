import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/api";

interface AppointmentInterface {
  _id: string;
  patientName: string;
  patientAge: number;
  patientPhone: number;
  doctorName: string;
  doctorSpec: string;
  timeSlot: string;
  status: "completed" | "cancelled" | "booked";
  userId: string;
  doctorId: string;
}

const AppointmentCards = () => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [doctorSlots, setDoctorSlots] = useState<string[]>([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await axiosInstance.get("/user/appointments");
        setAppointments(response?.data.data || []);
      } catch (err) {
        setError("Failed to load appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const fetchDoctorSlots = async (doctorId: string) => {
    try {
      const response = await axiosInstance.get(
        `user/doctors/doctorId/${doctorId}`
      );
      setDoctorSlots(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReschedule = async (appointmentId: string, doctorId: string) => {
    if (!selectedSlot) {
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `user/appointments/doctorId/${doctorId}`,
        { timeSlot: selectedSlot }
      );

      console.log(response);

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, timeSlot: selectedSlot }
            : appt
        )
      );

      setReschedulingId(null);
      setSelectedSlot("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading appointments...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (appointments.length === 0)
    return <div className="text-center py-8">No appointments found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {reschedulingId && (
        <div className="fixed inset-0 bg-transparent  backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-transparent border-5 border-primary rounded-3xl shadow-md shadow-secondary w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setReschedulingId(null);
                setSelectedSlot("");
              }}
              className="absolute top-4 right-4 text-xl font-bold hover:text-red-500 cursor-pointer"
            >
              ×
            </button>

            <h3 className="text-xl font-bold mb-4">Reschedule Appointment</h3>

            <div className="mb-4">
              <h4 className="text-md text-primary font-bold mb-2">
                Available Time Slots:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {doctorSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 border rounded-3xl text-sm cursor-pointer ${
                      selectedSlot === slot
                        ? "bg-bg-secondary border-primary text-primary"
                        : "border-primary hover:bg-gray-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setReschedulingId(null);
                  setSelectedSlot("");
                }}
                className="px-4 py-2 border text-primary border-primary rounded-3xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleReschedule(
                    reschedulingId,
                    appointments.find((a) => a._id === reschedulingId)
                      ?.doctorId || ""
                  )
                }
                disabled={!selectedSlot}
                className={`px-4 py-2 rounded-3xl cursor-pointer ${
                  selectedSlot
                    ? "bg-primary text-bg-primary hover:bg-secondary"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onReschedule={() => {
            setReschedulingId(appointment._id);
            fetchDoctorSlots(appointment.doctorId);
          }}
        />
      ))}
    </div>
  );
};

const AppointmentCard = ({
  appointment,
  onReschedule,
}: {
  appointment: AppointmentInterface;
  onReschedule: () => void;
}) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(
    appointment.status === "cancelled"
  );

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      setIsCancelling(true);
      await axiosInstance.delete(
        `/user/appointments/doctorId/${appointment.doctorId}`
      );
      setCancelled(true);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const statusColor = cancelled
    ? "bg-red-100 text-red-800"
    : appointment.status === "completed"
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";

  return (
    <div className="border rounded-3xl backdrop-blur-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-bold text-primary">
            {appointment.doctorName}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}
          >
            {cancelled ? "cancelled" : appointment.status}
          </span>
        </div>

        <p className="text-secondary font-bold mt-1">
          {appointment.doctorSpec}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{appointment.timeSlot}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>
              {appointment.patientName} (Age: {appointment.patientAge})
            </span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{appointment.patientPhone}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-10 space-x-3">
          <button
            disabled={cancelled}
            onClick={onReschedule}
            className={`px-4 py-2 bg-primary text-white rounded-3xl hover:bg-secondary transition-colors cursor-pointer ${
              cancelled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Reschedule
          </button>

          <button
            onClick={handleCancel}
            disabled={isCancelling || cancelled}
            className={`px-4 py-2 border border-red-500 text-red-500 rounded-3xl hover:bg-white transition-colors cursor-pointer ${
              cancelled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCancelling ? "Cancelling..." : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCards;
