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
    <div className="flex items-center gap-3 absolute top-7.5 right-10 font-bold text-primary text-lg">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        onClick={handleProfileModal}
        className="w-12 h-12 flex items-center justify-center rounded-full text-bg-primary font-bold bg-secondary cursor-pointer"
      >
        {getInitials(fullname)}
      </motion.div>
      <div className="">
        <p className="text-md font-bold">{fullname}</p>
        <motion.button
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.5 }}
          className="text-md text-primary cursor-pointer underline hover:text-slate-700"
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
