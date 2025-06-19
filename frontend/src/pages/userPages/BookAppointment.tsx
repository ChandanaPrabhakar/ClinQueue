/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/BookAppointment.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import { Stepper, Step, StepLabel, Modal, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SpecialtySelection from "../../components/booking/SpecialtySelection";
import DoctorSelection from "../../components/booking/DoctorSelection";
import SlotSelection from "../../components/booking/SlotSelection";
import Confirmation from "../../components/booking/Confirmation";
import BackgroundAnime from "../../components/BackgroundAnime";
import Logo from "../../components/Logo";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSpecialty && activeStep === 1) {
      fetchDoctorsBySpecialty();
    }
  }, [selectedSpecialty, activeStep]);

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

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    handleNext();
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    handleNext();
  };

  const handleBookAppointment = async () => {
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
    } catch (error) {
      console.error("Error booking appointment:", error);
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
            onNext={handleBookAppointment}
            patientMessage={patientMessage}
            setPatientMessage={setPatientMessage}
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
    <div className="min-h-screen flex items-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <BackgroundAnime />
      <Logo />
      <div className="max-w-3xl mx-auto bg-transparent backdrop-blur-lg border border-primary rounded-2xl shadow-lg overflow-hidden p-6">
        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "var(--color-primary)", // completed step color
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "var(--color-primary)", // active step color
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8">{getStepContent(activeStep)}</div>

        <Modal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          className="flex items-center justify-center backdrop-blur-md"
        >
          <div className="bg-transparent backdrop-blur-3xl border-5 border-primary rounded-3xl p-6 max-w-md w-full mx-4">
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
    </div>
  );
};

export default BookAppointment;
