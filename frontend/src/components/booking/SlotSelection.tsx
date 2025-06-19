import React from "react";
import { Person, CalendarToday } from "@mui/icons-material";
import { addHours, format } from "date-fns";
import { motion } from "framer-motion";

interface Doctor {
  doctorName: string;
  specialization: string;
  availableSlots: string[];
}

interface SlotSelectionProps {
  doctor: Doctor;
  onSlotSelect: (slot: string) => void;
  selectedSlot: string;
  onBack: () => void;
  onCancel: () => void;
  onNext: () => void;
  patientMessage: string;
  setPatientMessage: (message: string) => void;
  slotUsage: Record<string, number>;
}

const SlotSelection: React.FC<SlotSelectionProps> = ({
  doctor,
  onSlotSelect,
  selectedSlot,
  onBack,
  onCancel,
  onNext,
  patientMessage,
  setPatientMessage,
  slotUsage,
}) => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => addHours(today, i * 24));

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-secondary font-bold hover:underline cursor-pointer"
          onClick={onBack}
        >
          <Person className="mr-1" /> Back
        </button>
        <h2 className="text-xl font-bold text-primary">Select Time Slot</h2>
        <div></div>
      </div>

      {/* Doctor Card */}
      <div className="bg-secondary shadow-md rounded-3xl p-4 mb-6 flex items-center">
        <div className="w-16 h-16 bg-bg-secondary text-primary flex items-center justify-center rounded-full text-2xl font-bold mr-4">
          {doctor?.doctorName?.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bg-primary">
            {doctor?.doctorName}
          </h3>
          <p className="text-bg-primary text-sm">{doctor?.specialization}</p>
        </div>
      </div>

      {/* Available Dates */}
      <p className="font-medium text-primary mb-2">Available Dates</p>
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {dates.map((date, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`min-w-[120px] px-4 py-2 rounded-3xl border ${
              index === 0
                ? "bg-secondary text-white"
                : "bg-white text-primary border-gray-300"
            } hover:shadow cursor-pointer`}
          >
            {format(date, "EEE, MMM d")}
          </motion.button>
        ))}
      </div>

      {/* Available Time Slots */}
      <p className="font-medium text-primary mb-2">Available Time Slots</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {doctor?.availableSlots?.map((slot: string) => {
          const isFull = slotUsage?.[slot] >= 4;

          return (
            <motion.button
              key={slot}
              whileHover={{ scale: isFull ? 1 : 1.02 }}
              whileTap={{ scale: isFull ? 1 : 0.98 }}
              onClick={() => !isFull && onSlotSelect(slot)}
              disabled={isFull}
              className={`relative px-4 py-2 rounded-3xl border ${
                selectedSlot === slot
                  ? "bg-secondary text-white"
                  : isFull
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white text-primary border-gray-300"
              } hover:shadow cursor-pointer`}
            >
              {slot}
              <span className="text-xs block mt-1">
                {slotUsage?.[slot] || 0}/4 booked
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-primary mb-1">
          Any specific concerns? (Optional)
        </label>
        <textarea
          rows={3}
          value={patientMessage}
          onChange={(e) => setPatientMessage(e.target.value)}
          className="w-full border border-primary rounded-md p-2 focus:outline-none focus:ring-2 focus:secondary"
          placeholder="Enter your message..."
        />
      </div>

      {/* Divider */}
      <div className="border-t border-bg-secondary my-4"></div>

      {/* Footer Actions */}
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-4 py-2 rounded-3xl text-md font-bold text-primary border border-primary hover:bg-secondary hover:text-bg-primary cursor-pointer"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selectedSlot}
          className={`px-4 py-2 rounded-3xl flex items-center gap-2 text-md font-bold ${
            selectedSlot
              ? "bg-primary text-white hover:bg-secondary"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Confirm Appointment <CalendarToday fontSize="small" />
        </motion.button>
      </div>
    </div>
  );
};

export default SlotSelection;
