import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/api"; // Adjust path as needed

interface ProfileModalProp {
  isOpen: boolean;
  onClose: () => void;
  initials: string;
  fullName: string;
  age: number;
  phoneNumber: number;
}

const ProfileModal: React.FC<ProfileModalProp> = ({
  isOpen,
  onClose,
  initials,
  fullName,
  age,
  phoneNumber,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(fullName);
  const [editedAge, setEditedAge] = useState(age);
  const [editedPhone, setEditedPhone] = useState(phoneNumber);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      await axiosInstance.patch("/user/profile-update", {
        fullName: editedName,
        age: editedAge,
        phoneNumber: editedPhone,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50">
      <div className="border-3 bg-secondary/50 rounded-3xl shadow-2xl shadow-bg-secondary border-primary flex justify-center items-center flex-col relative p-6">
        <motion.button
          className="absolute top-5 right-5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          <MdClose className="text-2xl cursor-pointer hover:bg-secondary hover:text-bg-primary rounded-full" />
        </motion.button>

        <div className="w-25 h-25 flex items-center justify-center bg-bg-secondary text-5xl rounded-full my-4">
          {initials}
        </div>

        <div className="w-75 border border-primary bg-bg-primary/60 font-medium rounded-3xl my-4 px-4 py-2">
          {editMode ? (
            <input
              className="w-full border-none outline-none bg-transparent"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <h2>{editedName}</h2>
          )}
        </div>

        <div className="w-75 border border-primary bg-bg-primary/60 font-medium rounded-3xl my-4 px-4 py-2">
          {editMode ? (
            <input
              type="number"
              className="w-full border-none outline-none bg-transparent"
              value={editedAge}
              onChange={(e) => setEditedAge(Number(e.target.value))}
            />
          ) : (
            <h2>{editedAge}</h2>
          )}
        </div>

        <div className="w-75 border border-primary bg-bg-primary/60 font-medium rounded-3xl my-4 px-4 py-2">
          {editMode ? (
            <input
              type="tel"
              className="w-full border-none outline-none bg-transparent"
              value={editedPhone}
              onChange={(e) => setEditedPhone(Number(e.target.value))}
            />
          ) : (
            <h2>{editedPhone}</h2>
          )}
        </div>

        <div className="flex flex-row gap-3">
          <motion.button
            className="mt-4 w-30 font-medium justify-center bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            {editMode ? "Save" : "Edit"}
          </motion.button>
          <motion.button
            className="mt-4 w-30 font-medium justify-center bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={editMode ? () => setEditMode(false) : onClose}
          >
            {editMode ? "Cancel" : "Close"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
