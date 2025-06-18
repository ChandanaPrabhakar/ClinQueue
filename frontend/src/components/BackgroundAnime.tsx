import { motion } from "framer-motion";
import {
  LuBaby,
  LuBrain,
  LuDroplets,
  LuEar,
  LuEye,
  LuHeartPulse,
  LuStethoscope,
  LuUserCog,
} from "react-icons/lu";
import { FaTooth } from "react-icons/fa";
import { GiSkeleton } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";
import React from "react";
const medicalIcons = [
  <LuStethoscope />,
  <LuHeartPulse />,
  <LuBrain />,
  <LuDroplets />,
  <LuEar />,
  <FaTooth />,
  <LuEye />,
  <LuBaby />,
  <LuUserCog />,
  <GiSkeleton />,
  <MdPregnantWoman />,
];

const duplicatedIcons = medicalIcons.flatMap((icon) => {
  const numCopies = Math.floor(Math.random() * 10) + 1; // Random 1-5 copies
  return Array(numCopies).fill(icon);
});
const BackgroundAnime = () => {
  return (
    <div>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {duplicatedIcons.map((icon, index) => {
          const startX = 0 + Math.random() * 100; // 10%-90% of container
          const startY = 10 + Math.random() * 80;

          const moveX = (Math.random() - 0.5) * 500; // -20% to +20% movement
          const moveY = (Math.random() - 0.5) * 500;

          const duration = 30 + Math.random() * 1; // 30-60 seconds
          const delay = Math.random() * 1; // Staggered start

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0.6,
                x: 0,
                y: 0,
              }}
              animate={{
                x: moveX,
                y: moveY,
              }}
              transition={{
                x: {
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                y: {
                  duration: duration * 0.25, // Different timing for Y axis
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                delay: delay,
              }}
              className="absolute text-primary opacity-10"
              style={{
                fontSize: `${1 + Math.random() * 2}rem`, // 1-3rem size
                left: `${startX}%`,
                top: `${startY}%`,
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundAnime;
