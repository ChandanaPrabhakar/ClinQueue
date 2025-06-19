import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../../components/Logo";
import BackgroundAnime from "../../components/BackgroundAnime";
import ProfileInfoCard from "../../components/cards/ProfileCard";
import Navbar from "../../components/Navbar";
import DoctorCard from "../../components/DoctorCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import LoginButton from "../../components/LoginButton";
import LoginModal from "../../components/LoginModal";
import { motion } from "framer-motion";

interface DoctorInterface {
  _id: string;
  doctorName: string;
  email: string;
  specialization: string;
  qualification: string;
  experience: number;
  availableSlots: string[];
  createdAt: string;
  updatedAt: string;
}

const FindMyDoctor = () => {
  const [userInfo, setUserInfo] = useState<{
    fullName: string;
    age: number;
    phoneNumber: number;
    role: string;
  } | null>(null);
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInterface | null>(
    null
  );
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axiosInstance.get("/user/get-user");
    if (response?.data) {
      setUserInfo(response.data.data);
    }
  };

  const onLogout = () => {
    navigate("/home");
    localStorage.clear();
    setUserInfo(null);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/user/find-my-doctor");
        if (response?.data) {
          setDoctors(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error(err);
        toast.error("Unable to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
    fetchDoctors();
  }, []);

  // Get unique specializations for filter
  const specializations = [
    "All",
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  // Filter doctors based on search and specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doctor.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor: DoctorInterface) => {
    if (!userInfo) {
      setSelectedDoctor(doctor);
      setShowLoginModal(true);
    } else {
      navigate("/book-appointment", {
        state: { selectedDoctor: doctor },
      });
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    getUserInfo();
    if (selectedDoctor) {
      navigate("/book-appointment", {
        state: { selectedDoctor: selectedDoctor },
      });
    }
  };

  if (loading)
    return <div className="text-center py-12">Loading doctors...</div>;
  if (error)
    return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-primary min-h-screen flex items-center justify-center relative overflow-y-auto"
    >
      <Logo />
      <BackgroundAnime />
      {userInfo ? (
        <>
          <Navbar pageName={""} />
          <ProfileInfoCard
            fullname={userInfo.fullName}
            onLogout={onLogout}
            age={userInfo.age}
            phoneNumber={userInfo.phoneNumber}
          />
        </>
      ) : (
        <LoginButton />
      )}

      <div className="flex flex-col my-40 justify-center text-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Find Your Doctor
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              className="w-full px-4 py-2 backdrop-blur-lg border border-primary rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            className="px-4 py-2 backdrop-blur-lg rounded-3xl border border-primary focus:ring-2 focus:ring-primary focus:border-primary"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 text-3xl text-primary">
            No doctors found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        )}
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </motion.div>
  );
};

export default FindMyDoctor;
