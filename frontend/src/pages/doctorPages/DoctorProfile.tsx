import React, { useEffect, useState } from "react";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";
import DoctorProfileCard from "../../components/cards/DoctorProfileCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import DoctorDashboard from "../../components/DoctorDashboard";
import DoctorAppointmentCards from "../../components/cards/DoctorAppointmentCards";

const DoctorProfile = () => {
  const [DoctorInfo, setDoctorInfo] = useState<{
    doctorName: string;
    email: string;
    specialization: string;
    qualification: string;
    experience: number;
    password: string;
    role?: "doctor";
    availableSlots?: string[];
  } | null>(null);

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/home");
    localStorage.clear();
    setDoctorInfo(null);
  };

  const getDoctorInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axiosInstance.get("/doctor/doctor-profile");
    if (response?.data) {
      setDoctorInfo(response.data.data);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    return () => {};
  }, []);
  return (
    <div className="bg-bg-primary  min-h-screen flex items-center justify-center relative overflow-y-auto">
      <BackgroundAnime />
      <Logo />
      {DoctorInfo && (
        <div className="w-screen px-20 py-6 box-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 space-y-4">
              <DoctorProfileCard
                fullname={DoctorInfo.doctorName}
                onLogout={onLogout}
              />
              <DoctorDashboard doctorInfo={DoctorInfo} />
            </div>
            <div className="flex-1 border-2 rounded-3xl p-4">
              <DoctorAppointmentCards />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
