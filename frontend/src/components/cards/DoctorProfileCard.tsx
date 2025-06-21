import React from "react";
import { getDoctorInitials } from "../../utils/helper";
import { motion } from "framer-motion";

interface DoctorProfileCardProps {
  fullname: string;
  onLogout: () => void;
}

const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({
  fullname,
  onLogout,
}) => {
  return (
    <div className="flex items-center gap-3 absolute top-6 sm:top-7 right-4 sm:right-10 font-bold text-primary text-base sm:text-lg z-50">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full text-bg-primary font-bold bg-secondary cursor-pointer text-sm sm:text-base"
      >
        {getDoctorInitials(fullname)}
      </motion.div>
      <div className="flex flex-col items-start">
        <p className="text-sm sm:text-base font-bold truncate max-w-[120px] sm:max-w-none">
          {fullname}
        </p>
        <motion.button
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.5 }}
          className="text-sm text-primary cursor-pointer underline hover:text-slate-700"
          onClick={onLogout}
        >
          Log Out
        </motion.button>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
