/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { Stepper, Step, StepLabel, Modal, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SpecialtySelection from "../../components/booking/SpecialtySelection";
import DoctorSelection from "../../components/booking/DoctorSelection";
import SlotSelection from "../../components/booking/SlotSelection";
import Confirmation from "../../components/booking/Confirmation";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Define steps
const steps = [
  "Select Specialty",
  "Choose Doctor",
  "Book Slot",
  "Confirmation",
];

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientMessage, setPatientMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [slotUsage, setSlotUsage] = useState<Record<string, number>>({});

  const navigate = useNavigate();
  const location = useLocation();
  const passedDoctor = location.state?.selectedDoctor;

  // Fetch doctors based on specialty
  useEffect(() => {
    if (selectedSpecialty && activeStep === 1) {
      fetchDoctorsBySpecialty();
    }
  }, [selectedSpecialty, activeStep]);

  // Initialize if passed from route
  useEffect(() => {
    if (passedDoctor) {
      setSelectedDoctor(passedDoctor);
      setSelectedSpecialty(passedDoctor.specialization);
      setActiveStep(2);
      window.history.replaceState({}, document.title);
    }
  }, []);

  // Fetch slot usage
  useEffect(() => {
    if (selectedDoctor && activeStep === 2) {
      fetchSlotUsage(selectedDoctor._id);
    }
  }, [selectedDoctor, activeStep]);

  const fetchDoctorsBySpecialty = async () => {
    try {
      const response = await axiosInstance.get(
        `/user/doctor?specialization=${selectedSpecialty}`
      );
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchSlotUsage = async (doctorId: string) => {
    try {
      const res = await axiosInstance.get(`/user/doctor-slot-usage`, {
        params: { doctorId },
      });
      setSlotUsage(res.data.data);
    } catch (error) {
      console.error("Error fetching slot usage:", error);
    }
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCancel = () => {
    setIsSuccessModalOpen(false);
    navigate("/find-my-doctor");
  };

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    handleNext();
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    fetchSlotUsage(doctor._id);
    handleNext();
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot before continuing.");
      return;
    }

    try {
      const userResponse = await axiosInstance.get("/user/get-user");
      const user = userResponse.data.data;

      const appointmentData = {
        patientName: user.fullName,
        patientAge: user.age,
        patientPhone: user.phoneNumber,
        doctorName: selectedDoctor?.doctorName,
        doctorSpec: selectedDoctor?.specialization,
        timeSlot: selectedSlot,
        status: "booked",
        userId: user._id,
        doctorId: selectedDoctor?._id,
      };

      const response = await axiosInstance.post(
        "/user/book-appointment",
        appointmentData
      );

      setAppointmentDetails(response.data.data);
      setIsSuccessModalOpen(true);
      handleNext();
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error booking appointment:", err);
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error?.response?.data?.message ??
        "An unexpected error occurred while booking the appointment.";
      toast.error(message);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SpecialtySelection onSelect={handleSpecialtySelect} />;
      case 1:
        return (
          <DoctorSelection
            doctors={doctors}
            onSelect={handleDoctorSelect}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <SlotSelection
            doctor={selectedDoctor}
            onSlotSelect={setSelectedSlot}
            selectedSlot={selectedSlot}
            onBack={handleBack}
            onCancel={handleCancel}
            onNext={handleBookAppointment}
            patientMessage={patientMessage}
            setPatientMessage={setPatientMessage}
            slotUsage={slotUsage}
          />
        );
      case 3:
        return (
          <Confirmation
            appointmentDetails={appointmentDetails}
            onClose={() => navigate("/home")}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8"
    >
      <BackgroundAnime />
      <Logo />
      <div className="w-full max-w-3xl mx-auto bg-transparent backdrop-blur-lg border border-primary rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6">
        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    whiteSpace: "normal",
                    textAlign: "center",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "var(--color-primary)",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "var(--color-primary)",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8">{getStepContent(activeStep)}</div>

        {/* Success Modal */}
        <Modal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          className="flex items-center justify-center backdrop-blur-md px-4"
          aria-labelledby="appointment-success-title"
          aria-describedby="appointment-success-description"
        >
          <div className="bg-white dark:bg-bg-primary backdrop-blur-3xl border-4 border-primary rounded-3xl p-6 w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]">
            <div className="flex justify-end">
              <IconButton onClick={() => setIsSuccessModalOpen(false)}>
                <Close />
              </IconButton>
            </div>
            {appointmentDetails && (
              <Confirmation
                appointmentDetails={appointmentDetails}
                onClose={() => {
                  setIsSuccessModalOpen(false);
                  navigate("/home");
                }}
              />
            )}
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default BookAppointment;
