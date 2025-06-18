import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/user-login");
  };
  return (
    <div className="w-35 absolute top-7.5 right-10 font-bold text-primary text-lg">
      <motion.button
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        onClick={handleLogin}
        className="btn-login"
      >
        Login
      </motion.button>
    </div>
  );
};

export default LoginButton;
