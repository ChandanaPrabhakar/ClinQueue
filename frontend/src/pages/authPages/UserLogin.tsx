import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { motion } from "framer-motion";
import BackgroundAnime from "../../components/BackgroundAnime";
import { LuStethoscope } from "react-icons/lu";
import PasswordInput from "../../components/PasswordInput";

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

      console.log(response);

      if (response.data?.token) {
        localStorage.setItem("token", response.token);
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
      <div className="flex font-logo text-4xl absolute top-5 left-5 gap-2">
        <LuStethoscope />
        <h1>ClinQueue</h1>
      </div>
      <BackgroundAnime />
      <form
        onSubmit={handleLogin}
        className="w-95 rounded-4xl border border-primary bg-white px-7 py-10 shadow-2xl"
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
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter phone number"
          />
        </div>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
  );
};

export default UserLogin;
