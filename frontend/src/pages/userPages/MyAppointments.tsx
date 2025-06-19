import React, { useEffect, useState } from "react";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import ProfileInfoCard from "../../components/cards/ProfileCard";
import axiosInstance from "../../utils/api";
import { useNavigate } from "react-router-dom";
import AppointmentCards from "../../components/cards/AppointmentCards";
import { motion } from "framer-motion";

const MyAppointments = () => {
  const [userInfo, setUserInfo] = useState<{
    fullName: string;
    age: number;
    phoneNumber: number;
    role: string;
  } | null>(null);
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/home");
    localStorage.clear();
    setUserInfo(null);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axiosInstance.get("/user/get-user");
      if (response?.data) {
        setUserInfo(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-bg-primary min-h-screen flex items-center justify-center relative overflow-y-auto"
    >
      <Logo />
      <BackgroundAnime />
      <Navbar pageName={"MyAppointments"} />
      <ProfileInfoCard
        fullname={userInfo?.fullName || ""}
        onLogout={onLogout}
        age={userInfo?.age || 0}
        phoneNumber={userInfo?.phoneNumber || 0}
      />
      <AppointmentCards />
    </motion.div>
  );
};

export default MyAppointments;
