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
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-xl font-semibold text-primary text-center mb-6">
        What do you need help with?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {specialties.map((specialty, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={specialty}
            onClick={() => onSelect(specialty)}
            className="cursor-pointer bg-white border border-primary shadow-md hover:shadow-lg transition-all rounded-full p-4 text-center"
          >
            <div className="text-primary text-3xl font-bold mb-2 flex justify-center">
              {medicalIcons[index]}
            </div>
            <div className="text-md text-secondary  font-bold">{specialty}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtySelection;
