import React, { useState } from "react";
import { getInitials } from "../../utils/helper";
import { motion } from "framer-motion";
import ProfileModal from "../ProfileModal";
import { useLocation } from "react-router-dom";

interface ProfileCardProps {
  fullname: string;
  age: number;
  phoneNumber: number;
  onLogout: () => void;
}

const ProfileInfoCard: React.FC<ProfileCardProps> = ({
  fullname,
  age,
  phoneNumber,
  onLogout,
}) => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const location = useLocation();

  const handleProfileModal = () => {
    setShowProfileModal(true);
  };

  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex items-center gap-3 sm:gap-4 absolute top-6 right-4 sm:right-10 font-bold text-primary text-base sm:text-lg z-50">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        onClick={handleProfileModal}
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-bg-primary font-bold bg-secondary cursor-pointer text-sm sm:text-base"
      >
        {getInitials(fullname)}
      </motion.div>
      <div className="flex flex-col">
        <p className="text-md sm:text-base font-bold truncate max-w-[120px] sm:max-w-none">
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
          className="text-md sm:text-md text-primary cursor-pointer underline hover:text-slate-700"
          onClick={onLogout}
        >
          Log Out
        </motion.button>
      </div>
      {isHomePage && (
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          initials={getInitials(fullname)}
          fullName={fullname}
          age={age}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
};

export default ProfileInfoCard;
