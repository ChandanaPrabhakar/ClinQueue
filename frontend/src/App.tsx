import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/userPages/UserLogin";
import UserRegistration from "./pages/userPages/UserRegistration";
import MyAppointments from "./pages/userPages/MyAppointments";
import BookAppointment from "./pages/userPages/BookAppointment";
import Home from "./pages/userPages/Home";
import DoctorLogin from "./pages/doctorPages/DoctorLogin";
import ListAppointments from "./pages/doctorPages/ListAppointments";
import MyDocProfile from "./pages/doctorPages/MyDocProfile";
const router = (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/user-login" element={<UserLogin />} />
    <Route path="/user-registration" element={<UserRegistration />} />
    <Route path="/appointments" element={<MyAppointments />} />
    <Route path="/book-appointment" element={<BookAppointment />} />
    <Route path="/doctor-login" element={<DoctorLogin />} />
    <Route path="/list-appointment" element={<ListAppointments />} />
    <Route path="/doctor-profile" element={<MyDocProfile />} />
  </Routes>
);
function App() {
  return <div>{router}</div>;
}

export default App;
