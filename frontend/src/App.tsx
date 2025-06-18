import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/authPages/UserLogin";
import Home from "./pages/Home";
import DoctorLogin from "./pages/authPages/DoctorLogin";
import React from "react";
import UserRegistration from "./pages/authPages/UserRegistration";
const router = (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/user-login" element={<UserLogin />} />
    <Route path="/doctor-login" element={<DoctorLogin />} />
    <Route path="/user-registration" element={<UserRegistration />} />
  </Routes>
);
function App() {
  return <div>{router}</div>;
}

export default App;
