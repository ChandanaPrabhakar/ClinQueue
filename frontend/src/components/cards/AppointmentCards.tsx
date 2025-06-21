import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/api";
import toast from "react-hot-toast";
import RescheduleModal from "../RescheduleModal";

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
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await axiosInstance.get("/user/appointments");
        setAppointments(response?.data.data || []);
      } catch (err) {
        setError("Failed to load appointments");
        toast.error("Failed to Load Appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const fetchDoctorSlots = async (doctorId: string) => {
    setSlotsLoading(true);
    try {
      const response = await axiosInstance.get(
        `user/doctors/doctorId/${doctorId}`
      );
      setDoctorSlots(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load slots");
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleReschedule = async (appointmentId: string, doctorId: string) => {
    if (!selectedSlot) return;

    try {
      const response = await axiosInstance.patch(
        `user/appointments/doctorId/${doctorId}`,
        { timeSlot: selectedSlot }
      );

      toast.success(response.data.message);

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
      toast.error("Failed to reschedule");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading appointments...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (appointments.length === 0)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center text-lg font-bold border border-primary bg-secondary/50 text-primary px-10 py-4 rounded-3xl">
          No appointments found
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <RescheduleModal
        isOpen={!!reschedulingId}
        doctorSlots={doctorSlots}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        onClose={() => {
          setReschedulingId(null);
          setSelectedSlot("");
        }}
        onConfirm={() => {
          const appt = appointments.find((a) => a._id === reschedulingId);
          if (appt) {
            handleReschedule(appt._id, appt.doctorId);
          }
        }}
        loading={slotsLoading}
        doctorName={
          appointments.find((a) => a._id === reschedulingId)?.doctorName || ""
        }
      />

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onReschedule={async () => {
            setReschedulingId(appointment._id);
            await fetchDoctorSlots(appointment.doctorId);
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
  const isCompleted = appointment.status === "completed";

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      setIsCancelling(true);
      const response = await axiosInstance.delete(
        `/user/appointments/doctorId/${appointment.doctorId}`
      );
      setCancelled(true);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to Cancel Appointment");
    } finally {
      setIsCancelling(false);
    }
  };

  const statusColor = cancelled
    ? "bg-red-100 text-red-800"
    : isCompleted
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";

  return (
    <div
      className={`border rounded-3xl backdrop-blur-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
        isCompleted ? "opacity-70 pointer-events-none" : ""
      }`}
    >
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

        <div className="mt-4 space-y-2 text-sm">
          <div>{appointment.timeSlot}</div>
          <div>
            {appointment.patientName} (Age: {appointment.patientAge})
          </div>
          <div>{appointment.patientPhone}</div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            disabled={cancelled || isCompleted}
            onClick={onReschedule}
            className={`px-4 py-2 bg-primary text-white rounded-3xl hover:bg-secondary transition-colors ${
              cancelled || isCompleted ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Reschedule
          </button>

          <button
            onClick={handleCancel}
            disabled={isCancelling || cancelled || isCompleted}
            className={`px-4 py-2 border border-red-500 text-red-500 rounded-3xl hover:bg-white transition-colors ${
              isCancelling || cancelled || isCompleted
                ? "opacity-70 cursor-not-allowed"
                : ""
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
