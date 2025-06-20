import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserLogin from "./pages/authPages/UserLogin";
import Home from "./pages/Home";
import DoctorLogin from "./pages/authPages/DoctorLogin";
import React from "react";
import UserRegistration from "./pages/authPages/UserRegistration";
import BookAppointment from "./pages/userPages/BookAppointment";
import MyAppointments from "./pages/userPages/MyAppointments";
import FindMyDoctor from "./pages/userPages/FindMyDoctor";
import DoctorProfile from "./pages/doctorPages/DoctorProfile";
const router = (
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<Home />} />
    <Route path="/user-login" element={<UserLogin />} />
    <Route path="/doctor-login" element={<DoctorLogin />} />
    <Route path="/user-registration" element={<UserRegistration />} />
    <Route path="/book-appointment" element={<BookAppointment />} />
    <Route path="/my-appointments" element={<MyAppointments />} />
    <Route path="/find-my-doctor" element={<FindMyDoctor />} />
    <Route path="/doctor-profile" element={<DoctorProfile />} />
  </Routes>
);
function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {router}
    </div>
  );
}

export default App;
