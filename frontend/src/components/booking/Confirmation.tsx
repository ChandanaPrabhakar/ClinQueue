import React from "react";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

interface ConfirmationProps {
  appointmentDetails: {
    doctorName: string;
    doctorSpec: string;
    timeSlot: string;
    status: string;
  };
  onClose: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  appointmentDetails,
  onClose,
}) => {
  return (
    <div className="text-center px-4 py-8">
      <FaCheckCircle className="text-green-500 text-5xl sm:text-6xl mx-auto" />
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mt-4">
        Appointment Confirmed!
      </h2>

      {appointmentDetails && (
        <div className="mt-6 w-full max-w-md mx-auto bg-bg-primary shadow-md rounded-3xl p-4 sm:p-6 text-left space-y-4 border border-primary">
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
            Appointment Details
          </h3>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
            <span className="text-primary">Doctor:</span>
            <span className="font-bold text-primary sm:text-right">
              {appointmentDetails.doctorName}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
            <span className="text-primary">Specialization:</span>
            <span className="font-bold text-primary sm:text-right">
              {appointmentDetails.doctorSpec}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
            <span className="text-primary">Date & Time:</span>
            <span className="font-bold text-primary sm:text-right">
              {appointmentDetails.timeSlot}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
            <span className="text-primary">Status:</span>
            <span className="inline-block bg-bg-secondary text-primary text-md px-3 py-1 rounded-full mt-1 sm:mt-0 sm:ml-2 sm:text-right">
              {appointmentDetails.status}
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
        <button
          onClick={() => alert("Added to calendar")}
          className="flex items-center justify-center gap-2 bg-primary text-bg-primary px-4 py-2 rounded-3xl hover:bg-secondary transition w-full sm:w-auto"
        >
          <FaCalendarAlt />
          Add to Calendar
        </button>
        <button
          onClick={onClose}
          className="border border-primary bg-white text-primary px-4 py-2 rounded-3xl hover:bg-bg-secondary hover:text-primary transition w-full sm:w-auto"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
