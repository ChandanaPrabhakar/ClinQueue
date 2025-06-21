import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Doctor {
  doctorName: string;
  email: string;
  specialization: string;
  qualification: string;
  experience: number;
  password: string;
  role?: "doctor";
  availableSlots?: string[];
}

interface DoctorDashboardProps {
  doctorInfo: Doctor;
}

const timeOptions: string[] = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctorInfo }) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (doctorInfo?.availableSlots) {
      setSelectedSlots(doctorInfo.availableSlots);
    }
  }, [doctorInfo]);

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const submitSlots = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.patch("/doctor/available-slots", {
        timeSlots: selectedSlots,
      });
      toast.success("Slots updated!");
    } catch (err) {
      console.error("Error updating slots", err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-transparent backdrop-blur-lg border-2 border-primary rounded-3xl p-6 max-w-3xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold text-center text-primary mb-7 underline underline-offset-4">
        Welcome, Dr. {doctorInfo.doctorName}
      </h1>

      {/* Doctor Info */}
      <div className="flex flex-col gap-2 text-primary mb-6 text-sm sm:text-base">
        <p>
          <strong>Email:</strong> {doctorInfo.email}
        </p>
        <p>
          <strong>Specialization:</strong> {doctorInfo.specialization}
        </p>
        <p>
          <strong>Qualification:</strong> {doctorInfo.qualification}
        </p>
        <p>
          <strong>Experience:</strong> {doctorInfo.experience} years
        </p>
      </div>

      {/* Slot Selector */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-5">
          Select Available Slots
        </h2>
        <div className="flex flex-wrap gap-3">
          {timeOptions.map((slot) => {
            const isSelected = selectedSlots.includes(slot);
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                key={slot}
                onClick={() => toggleSlot(slot)}
                aria-pressed={isSelected}
                aria-label={`Toggle slot ${slot}`}
                className={`px-4 py-2 rounded-full font-medium border cursor-pointer text-sm sm:text-base ${
                  isSelected
                    ? "bg-primary text-bg-primary"
                    : "bg-bg-primary text-primary"
                }`}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={submitSlots}
          disabled={selectedSlots.length === 0 || isLoading}
          className={`mt-10 px-6 py-2 rounded-3xl text-white text-sm sm:text-base font-semibold transition-all ${
            selectedSlots.length === 0 || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary hover:bg-primary"
          }`}
        >
          {isLoading ? "Saving..." : "Submit Slots"}
        </motion.button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
