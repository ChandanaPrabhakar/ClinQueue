import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";
import { motion } from "framer-motion";

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
    try {
      await axiosInstance.patch("/doctor/available-slots", {
        timeSlots: selectedSlots,
      });
      alert("Slots updated!");
    } catch (err) {
      console.error("Error updating slots", err);
    }
  };

  return (
    <div className="bg-transparent backdrop-blur-lg border-2 border-primary rounded-3xl  p-6 max-w-3xl mx-auto shadow-lg ">
      <h1 className="text-3xl font-bold text-center text-primary mb-7 underline underline-offset-6 my-5">
        Welcome, Dr. {doctorInfo.doctorName}
      </h1>

      <div className="flex items-center flex-col">
        <div className="doc-para">
          <p>Email: {doctorInfo.email}</p>
        </div>
        <div className="doc-para">
          <p>Specialization: {doctorInfo.specialization}</p>
        </div>
        <div className="doc-para">
          <p>Qualification: {doctorInfo.qualification}</p>
        </div>
        <div className="doc-para">
          <p>Experience: {doctorInfo.experience} years</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-primary mb-7.5">
          Select Available Slots
        </h2>
        <div className="flex flex-wrap gap-3">
          {timeOptions.map((slot) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`px-4 py-2 rounded-full font-medium border cursor-pointer ${
                selectedSlots.includes(slot)
                  ? "bg-primary text-bg-primary"
                  : "bg-bg-primary text-primary"
              }`}
            >
              {slot}
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={submitSlots}
          className="mt-10 px-6 py-2 bg-secondary text-white rounded-3xl hover:bg-primary hover:text-bg-primary cursor-pointer"
        >
          Submit Slots
        </motion.button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
