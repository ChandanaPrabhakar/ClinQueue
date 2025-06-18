import React, { useEffect, useState } from "react";
import ProfileInfoCard from "../components/cards/ProfileCard";
import Logo from "../components/Logo";
import BackgroundAnime from "../components/BackgroundAnime";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";
import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";
import DoctorAppointmentBanner from "../components/DoctorAppointmentBanner";

const Home = () => {
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
    const response = await axiosInstance.get("/user/get-user");
    if (response?.data) {
      setUserInfo(response.data.data);
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);
  return (
    <div className="bg-bg-primary min-h-screen flex items-center justify-center relative overflow-y-auto">
      <BackgroundAnime />
      <Logo />
      {userInfo ? (
        <>
          <ProfileInfoCard fullname={userInfo?.fullName} onLogout={onLogout} />{" "}
          <Navbar pageName={"Home"} />
        </>
      ) : (
        <LoginButton />
      )}
      <DoctorAppointmentBanner isAuthenticated={userInfo ? true : false} />
    </div>
  );
};

export default Home;
