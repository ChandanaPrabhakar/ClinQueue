import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/authPages/UserLogin";
import Home from "./pages/Home";
import DoctorLogin from "./pages/authPages/DoctorLogin";
import React from "react";
import UserRegistration from "./pages/authPages/UserRegistration";
import BookAppointment from "./pages/userPages/BookAppointment";
import MyAppointments from "./pages/userPages/MyAppointments";
import FindMyDoctor from "./pages/userPages/FindMyDoctor";
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
  </Routes>
);
function App() {
  return <div>{router}</div>;
}

export default App;
