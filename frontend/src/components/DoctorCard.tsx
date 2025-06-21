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
      <div className="p-4 sm:p-6">
        {/* Top section */}
        <div className="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
          <div className="flex-shrink-0">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-bg-secondary flex items-center justify-center">
              <FaUserMd
                className="h-6 w-6 sm:h-8 sm:w-8 text-primary"
                aria-label="Doctor avatar icon"
              />
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-primary">
              {doctor.doctorName}
            </h3>
            <p className="text-sm text-secondary">{doctor.specialization}</p>
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <FaClinicMedical
              className="text-primary mt-1"
              aria-label="Qualification icon"
            />
            <span className="text-sm text-primary break-words">
              {doctor.qualification}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <FaStar
              className="text-yellow-400 mt-1"
              aria-label="Experience icon"
            />
            <span className="text-sm text-primary">
              {doctor.experience} years experience
            </span>
          </div>

          <div className="flex items-start gap-2">
            <FaRegClock
              className="text-primary mt-1"
              aria-label="Availability icon"
            />
            <span className="text-sm text-primary">
              {doctor.availableSlots.length} slots available today
            </span>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-5 sm:mt-6">
          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full py-2 text-sm sm:text-base bg-primary hover:bg-secondary text-white font-semibold rounded-3xl transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
