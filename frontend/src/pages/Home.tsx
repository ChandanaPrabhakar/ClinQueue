import DoctorAppointmentBanner from "../components/DoctorAppointmentBanner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <DoctorAppointmentBanner isAuthenticated={true} />
    </div>
  );
};

export default Home;
