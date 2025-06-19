import React, { useEffect, useState } from "react";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import ProfileInfoCard from "../../components/cards/ProfileCard";
import axiosInstance from "../../utils/api";
import { useNavigate } from "react-router-dom";
import AppointmentCards from "../../components/cards/AppointmentCards";

const MyAppointments = () => {
  const [userInfo, setUserInfo] = useState<{
    fullName: string;
    age: number;
    phoneNumber: number;
    role: string;
  } | null>(null);
  const [fullname, setFullname] = useState<string>("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/home");
    localStorage.clear();
    setUserInfo(null);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axiosInstance.get("/user/get-user");
    if (response?.data) {
      setUserInfo(response.data.data);
      setFullname(response.data.data.fullName);
    }
  };

  console.log(userInfo);

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);
  return (
    <div className="bg-bg-primary min-h-screen flex items-center justify-center relative overflow-y-auto">
      <Logo />
      <BackgroundAnime />
      <Navbar pageName={"MyAppointments"} />
      <ProfileInfoCard fullname={fullname} onLogout={onLogout} />
      <AppointmentCards />
    </div>
  );
};

export default MyAppointments;
