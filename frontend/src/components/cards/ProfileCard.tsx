import React from "react";
import { getInitials } from "../../utils/helper";
import { motion } from "framer-motion";

const ProfileInfoCard = ({ fullname, onLogout }) => {
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
    </div>
  );
};

export default ProfileInfoCard;
