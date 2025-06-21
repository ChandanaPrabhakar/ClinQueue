import React from "react";
import { Person } from "@mui/icons-material";
import { motion } from "framer-motion";

interface Doctor {
  _id: string;
  doctorName: string;
  specialization: string;
  qualification: string;
  experience: number;
  availableSlots: string[];
}

interface DoctorSelectionProps {
  doctors: Doctor[];
  onSelect: (doctor: Doctor) => void;
  onBack: () => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  onSelect,
  onBack,
}) => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <button
          onClick={onBack}
          className="flex items-center text-secondary text-md font-bold hover:underline"
        >
          <Person className="mr-1" /> Back
        </button>
        <h2 className="text-lg text-center sm:text-left font-semibold text-primary">
          {doctors.length > 0
            ? `Available ${doctors[0].specialization}s`
            : "No doctors available"}
        </h2>
        <div className="hidden sm:block w-[40px]" /> {/* Spacer */}
      </div>

      {/* Doctor List */}
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(doctor)}
            className="cursor-pointer bg-secondary border border-bg-secondary rounded-3xl shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center"
          >
            {/* Avatar */}
            <div className="w-16 h-16 bg-bg-secondary text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4 sm:mb-0 sm:mr-4">
              {doctor.doctorName.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex flex-col flex-grow text-center sm:text-left">
              <h3 className="text-lg font-semibold text-bg-primary">
                {doctor.doctorName}
              </h3>
              <p className="text-bg-primary text-sm">{doctor.qualification}</p>

              {/* Chips */}
              <div className="flex flex-wrap justify-center sm:justify-start mt-2 gap-2 text-sm">
                <span className="bg-bg-primary text-primary px-2 py-1 rounded-full">
                  {doctor.experience} years exp
                </span>
                <span className="bg-bg-secondary text-primary px-2 py-1 rounded-full">
                  {doctor.availableSlots.length} slots today
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;
