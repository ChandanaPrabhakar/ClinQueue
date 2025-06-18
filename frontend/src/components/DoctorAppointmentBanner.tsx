import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClinicMedical,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // or your routing library

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
      // User is logged in - proceed to booking
      navigate("/book-appointment");
    } else {
      // User not logged in - redirect to register
      navigate("/register", { state: { from: "/book-appointment" } });
      // Optional: Show toast notification
      // toast.info('Please register or login to book an appointment');
    }
  };

  const handleFindDoctor = () => {
    navigate("/doctors");
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                Book Your Doctor Appointment
              </span>
              <br />
              <span className="text-gray-800">In Just a Few Clicks</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Connect with top healthcare professionals in your area. Our
              platform makes it simple to find, compare, and book appointments
              with the best doctors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookAppointment}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindDoctor}
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Find a Doctor
              </motion.button>
            </div>
          </motion.div>

          {/* Right content - doctor illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-2xl opacity-75 -z-10 blur-md"></div>

              <div className="bg-gradient-to-br from-indigo-100 to-blue-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Dr. Sarah Johnson
                    </h3>
                    <p className="text-sm text-gray-600">Cardiologist</p>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Available Today
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-indigo-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt="Doctor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                      <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-bold text-indigo-700">12+ Years</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-bold text-indigo-700">4.9 ★</p>
                  </div>
                </div>

                <button
                  onClick={handleBookAppointment}
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorAppointmentBanner;
