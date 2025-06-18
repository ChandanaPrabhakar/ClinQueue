import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { motion } from "framer-motion";
import BackgroundAnime from "../../components/BackgroundAnime";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from "../../utils/helper";
import React from "react";
import Logo from "../../components/Logo";

const DoctorLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter valid email");
      return;
    }

    if (!password) {
      setError("Please enter valid password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post("/auth/doctor-login", {
        email,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
        navigate("/home");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response.message ??
          "An unexpected error occurred. Please try again later."
      );
    }
  };
  return (
    <div className="bg-bg-primary min-h-screen flex items-center justify-center relative">
      <Logo />
      <BackgroundAnime />
      <form
        onSubmit={handleLogin}
        className="w-95 rounded-4xl border border-primary bg-white px-7 py-10 shadow-2xl"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-primary">
          Doctor Login
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </form>
    </div>
  );
};

export default DoctorLogin;
