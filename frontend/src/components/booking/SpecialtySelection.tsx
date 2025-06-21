import React from "react";
import { motion } from "framer-motion";
import {
  LuStethoscope,
  LuHeartPulse,
  LuBrain,
  LuDroplets,
  LuEar,
  LuEye,
  LuBaby,
} from "react-icons/lu";
import { FaTooth } from "react-icons/fa";
import { GiSkeleton } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";

const specialties = [
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "ENT",
  "Dentist",
  "Eye Specialist",
  "Pediatrician",
  "Orthopedist",
  "Gynecologist",
];

const medicalIcons = [
  <LuStethoscope />,
  <LuHeartPulse />,
  <LuBrain />,
  <LuDroplets />,
  <LuEar />,
  <FaTooth />,
  <LuEye />,
  <LuBaby />,
  <GiSkeleton />,
  <MdPregnantWoman />,
];

interface SpecialtySelectionProps {
  onSelect: (specialty: string) => void;
}

const SpecialtySelection: React.FC<SpecialtySelectionProps> = ({
  onSelect,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-primary text-center mb-8">
        What do you need help with?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {specialties.map((specialty, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            key={specialty}
            onClick={() => onSelect(specialty)}
            className="cursor-pointer bg-white border border-primary shadow-sm hover:shadow-md transition-all rounded-3xl p-4 flex flex-col items-center text-center"
          >
            <div className="text-primary text-3xl mb-2">
              {medicalIcons[index]}
            </div>
            <div className="text-sm sm:text-base font-semibold text-secondary">
              {specialty}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtySelection;
