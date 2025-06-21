import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { motion } from "framer-motion";
import BackgroundAnime from "../../components/BackgroundAnime";
import PasswordInput from "../../components/PasswordInput";
import React from "react";
import Logo from "../../components/Logo";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
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
        navigate("/home");
      }
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        "An unexpected error occurred. Please try again later.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen flex items-center justify-center relative px-4 sm:px-6">
      <div className="absolute top-5 right-4 sm:top-7.5 sm:right-10 font-bold text-primary text-sm sm:text-lg">
        <p>
          Are you a Doctor?{" "}
          <Link to={"/doctor-login"} className="underline">
            Login
          </Link>
        </p>
      </div>

      <Logo />
      <BackgroundAnime />

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-4xl border border-primary bg-bg-primary/50 backdrop-blur px-6 sm:px-8 py-8 sm:py-10 shadow-2xl"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-primary">
          User Login
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
          transition={{ duration: 0.5 }}
          type="submit"
          className="btn-login w-full mt-4 py-2 rounded-2xl bg-primary text-white font-semibold text-sm sm:text-base"
        >
          Login
        </motion.button>

        <p className="text-center my-5 text-sm sm:text-base">
          Not Registered Yet?{" "}
          <Link to={"/user-registration"} className="underline text-primary">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
