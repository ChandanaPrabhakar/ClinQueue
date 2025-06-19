import React, { FormEvent, useState } from "react";
import Logo from "../../components/Logo";
import BackgroundAnime from "../../components/BackgroundAnime";
import { motion } from "framer-motion";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const UserRegistration = () => {
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }

    if (!age) {
      setError("Please enter age");
      return;
    }

    if (!phoneNumber) {
      setError("Please enter valid email");
      return;
    }

    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (!password) {
      setError("Please enter valid password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post("/auth/user-register", {
        fullName,
        age,
        phoneNumber,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
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
    <div className="bg-bg-primary min-h-screen flex items-center justify-center relative">
      <Logo />
      <BackgroundAnime />
      <form
        onSubmit={handleLogin}
        className="w-95 rounded-4xl border border-primary bg-bg-primary/50 backdrop-blur px-7 py-10 shadow-2xl"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-primary">
          User Registration
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter Full Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary">
            Age
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter Age"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhoneNumber(onlyDigits);
            }}
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
          transition={{ duration: 0.5 }}
          type="submit"
          className="btn-login"
        >
          Login
        </motion.button>
        <p className="text-center my-5">
          Already have an account? {""}
          <Link to={"/user-login"} className="underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegistration;
