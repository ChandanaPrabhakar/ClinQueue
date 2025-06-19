import React from "react";
import { FaUserMd, FaClinicMedical, FaRegClock, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

interface DoctorInterface {
  _id: string;
  doctorName: string;
  email: string;
  specialization: string;
  qualification: string;
  experience: number;
  availableSlots: string[];
  createdAt: string;
  updatedAt: string;
}

interface DoctorCardProps {
  doctor: DoctorInterface;
  onBookAppointment: (doctor: DoctorInterface) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-transparent backdrop-blur-lg border-2 border-primary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-bg-secondary flex items-center justify-center">
              <FaUserMd className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">
              {doctor.doctorName}
            </h3>
            <p className="text-secondary">{doctor.specialization}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <FaClinicMedical className="text-primary mr-2" />
            <span className="text-sm text-primary">{doctor.qualification}</span>
          </div>

          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-2" />
            <span className="text-sm text-primary">
              {doctor.experience} years experience
            </span>
          </div>

          <div className="flex items-center">
            <FaRegClock className="text-primary mr-2" />
            <span className="text-sm text-primary">
              {doctor.availableSlots.length} slots available today
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full py-2 bg-primary hover:bg-secondary text-white font-medium rounded-3xl transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
