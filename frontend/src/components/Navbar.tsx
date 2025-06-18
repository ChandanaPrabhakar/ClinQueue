import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaListAlt } from "react-icons/fa";

interface PageName {
  pageName: "Home" | "MyAppointments";
}
const Navbar: React.FC<PageName> = ({ pageName }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<"Home" | "MyAppointments">("Home");

  const handleHome = () => {
    navigate("/home");
  };

  const handleMyAppointments = () => {
    navigate("/My-Appointments");
  };

  useEffect(() => {
    if (pageName === "Home" || pageName === "MyAppointments") {
      setActive(pageName);
    }
  }, [pageName]);

  return (
    <div className="absolute top-7.5">
      <div className="border border-primary rounded-3xl shadow-2xl shadow-secondary bg-white">
        <ul className="flex flex-row justify-between items-center px-10 py-2 gap-10 font-bold text-lg">
          <motion.li
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            className={`cursor-pointer px-10 flex items-center gap-2 ${
              active === "Home"
                ? "text-secondary underline decoration-3 underline-offset-6"
                : "text-primary"
            }`}
            onClick={handleHome}
          >
            <FaHome className="mx-1 mb-0.5" />
            Home
          </motion.li>
          <motion.li
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            className={`cursor-pointer px-10 flex items-center gap-2${
              active === "MyAppointments"
                ? "text-secondary underline decoration-3 underline-offset-6"
                : "text-primary"
            }`}
            onClick={handleMyAppointments}
          >
            <FaListAlt className="mx-2 mb-0.5 text-lg font-bold text-primary" />
            My Appointments
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
