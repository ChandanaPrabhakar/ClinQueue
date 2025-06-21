import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaListAlt } from "react-icons/fa";

interface PageName {
  pageName: "" | "Home" | "MyAppointments";
}

const Navbar: React.FC<PageName> = ({ pageName }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <FaHome className="mx-1 mb-0.5" />,
      path: "/home",
    },
    {
      label: "MyAppointments",
      icon: <FaListAlt className="mx-2 mb-0.5" />,
      path: "/my-appointments",
    },
  ];

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-8 md:px-0">
      <div className="border border-primary rounded-3xl shadow-2xl shadow-secondary bg-white max-w-2xl mx-auto">
        <ul className="flex flex-wrap justify-center sm:justify-between items-center px-6 sm:px-10 py-3 gap-4 sm:gap-10 font-bold text-base sm:text-lg">
          {navItems.map((item) => (
            <motion.li
              key={item.label}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
              className={`cursor-pointer px-4 sm:px-6 flex items-center gap-1 sm:gap-2 ${
                pageName === item.label
                  ? "text-secondary underline decoration-2 underline-offset-4"
                  : "text-primary"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.label === "MyAppointments" ? "My Appointments" : item.label}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
