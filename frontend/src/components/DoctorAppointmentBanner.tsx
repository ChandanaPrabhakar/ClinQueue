import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClinicMedical,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DoctorAppointmentBannerProps {
  isAuthenticated: boolean;
}

const DoctorAppointmentBanner: React.FC<DoctorAppointmentBannerProps> = ({
  isAuthenticated,
}) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaUserMd />,
      title: "Expert Doctors",
      description: "Board-certified specialists",
    },
    {
      icon: <FaClinicMedical />,
      title: "Modern Clinics",
      description: "State-of-the-art facilities",
    },
    {
      icon: <FaClock />,
      title: "Quick Access",
      description: "Same-day appointments",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Booking",
      description: "24/7 online scheduling",
    },
  ];

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      navigate("/book-appointment");
    } else {
      navigate("/user-login", { state: { from: "/book-appointment" } });
    }
  };

  const handleFindDoctor = () => {
    navigate("/find-my-doctor");
  };

  return (
    <div className="relative border border-primary rounded-2xl bg-transparent backdrop-blur-lg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-bg-secondary leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Book Your Doctor Appointment
              </span>
              <br />
              <span className="text-secondary">In Just a Few Clicks</span>
            </h1>

            <p className="text-base sm:text-lg text-primary mb-8 max-w-lg">
              Connect with top healthcare professionals in your area. Our
              platform makes it simple to find, compare, and book appointments
              with the best doctors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookAppointment}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-bg-primary text-base sm:text-lg font-bold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Book Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindDoctor}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-primary font-bold text-base sm:text-lg rounded-3xl border border-primary shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer
                "
              >
                Find a Doctor
              </motion.button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-xl">
              <div className="absolute -inset-2 bg-primary to-bg-secondary rounded-2xl opacity-75 -z-10 blur-md"></div>

              <div className="bg-secondary rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
                  <div>
                    <h3 className="font-bold text-bg-primary">
                      Dr. Sarah Johnson
                    </h3>
                    <p className="text-sm text-bg-primary">Cardiologist</p>
                  </div>
                  <div className="bg-bg-primary text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    Available Today
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-bg-secondary flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt="Doctor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                      <div className="bg-green-500 w-3 h-3 sm:w-4 sm:h-4 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-xs text-primary">Experience</p>
                    <p className="font-bold text-primary">12+ Years</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-xs text-primary">Rating</p>
                    <p className="font-bold text-primary">4.9 ★</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleBookAppointment}
                  className="w-full py-2 bg-primary text-bg-primary rounded-3xl text-base sm:text-lg font-bold hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                >
                  Book Appointment
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-primary mb-1 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorAppointmentBanner;
