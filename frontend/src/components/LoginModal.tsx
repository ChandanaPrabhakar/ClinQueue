/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import toast from "react-hot-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!phoneNumber.match(/^\d{10}$/)) {
      setPhoneError("Enter a valid 10-digit phone number.");
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!isValid) return;

    try {
      const response = await axiosInstance.post("/auth/user-login", {
        phoneNumber,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        onLoginSuccess();
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "An unexpected error occurred. Please try again.";
      toast.error(message);
    }
  };

  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-xl flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click closing modal when clicking inside
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">User Login</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-primary hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-secondary">
              Phone Number
            </label>
            <input
              type="tel"
              pattern="\d{10}"
              maxLength={10}
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter 10-digit phone number"
            />
            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-secondary">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="btn-login w-full"
          >
            Login
          </motion.button>

          <p className="text-center my-5 text-secondary">
            Not Registered Yet?{" "}
            <Link to="/user-registration" className="underline text-primary">
              Create an Account
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginModal;
