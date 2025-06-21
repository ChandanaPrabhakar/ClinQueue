import { motion } from "framer-motion";
import React from "react";

interface Props {
  isOpen: boolean;
  doctorSlots: string[];
  selectedSlot: string;
  setSelectedSlot: (slot: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  doctorName: string;
}

const RescheduleModal: React.FC<Props> = ({
  isOpen,
  doctorSlots,
  selectedSlot,
  setSelectedSlot,
  onClose,
  onConfirm,
  loading,
  doctorName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-transparent backdrop-blur-lg border-2 border-primary rounded-3xl shadow-md w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold hover:text-red-500 cursor-pointer"
        >
          ×
        </button>

        <h3 className="text-xl font-bold mb-4 text-primary">
          Reschedule with Dr. {doctorName}
        </h3>

        <div className="mb-4">
          <h4 className="text-md text-primary font-bold mb-2">
            Available Time Slots:
          </h4>

          {loading ? (
            <p className="text-sm text-gray-500">Loading slots...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {doctorSlots.map((slot) => (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 border rounded-3xl text-sm cursor-pointer ${
                    selectedSlot === slot
                      ? "bg-secondary border-primary text-primary"
                      : "border-primary hover:bg-primary hover:text-bg-primary"
                  }`}
                >
                  {slot}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border text-primary border-primary rounded-3xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!selectedSlot}
            className={`px-4 py-2 rounded-3xl ${
              selectedSlot
                ? "bg-primary text-white hover:bg-secondary cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
