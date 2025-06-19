/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/LoginModal.tsx
import React, { useState } from "react";
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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError("Please enter valid phone number");
      return;
    }

    if (!password) {
      setError("Please enter valid password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post("/auth/user-login", {
        phoneNumber,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response.data?.token);
        toast.success(response.data.message);
        onLoginSuccess();
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "An unexpected error occurred. Please try again later.";
      setError(message);
      toast.error(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Login</h2>
          <button
            onClick={onClose}
            className="text-primary cursor-pointer hover:text-primary"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-secondary">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-secondary">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }} // For initial and animate transitions
            type="submit"
            className="btn-login"
          >
            Login
          </motion.button>
          <p className="text-center my-5">
            Not Registered Yet? {""}
            <Link to={"/user-registration"} className="underline text-primary">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
