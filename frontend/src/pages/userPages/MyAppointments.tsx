import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/api";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import ProfileInfoCard from "../../components/cards/ProfileCard";
import AppointmentCards from "../../components/cards/AppointmentCards";

interface UserInfo {
  fullName: string;
  age: number;
  phoneNumber: number;
  role: string;
}

const MyAppointments = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/user/get-user");
      if (response?.data?.data) {
        setUserInfo(response.data.data);
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setError("Failed to load user information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="text-center text-lg text-primary py-12">
        Loading your appointments...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!userInfo) {
    return (
      <div className="text-center text-gray-500 py-12">
        Please log in to view your appointments.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-bg-primary min-h-screen flex items-center justify-center relative overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Logo />
      <BackgroundAnime />
      <Navbar pageName="MyAppointments" />
      <ProfileInfoCard
        fullname={userInfo.fullName}
        age={userInfo.age}
        phoneNumber={userInfo.phoneNumber}
        onLogout={handleLogout}
      />
      <AppointmentCards />
    </motion.div>
  );
};

export default MyAppointments;
