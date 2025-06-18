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
import React, { useMemo } from "react";
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

const BackgroundAnime = () => {
  const duplicatedIcons = useMemo(() => {
    return medicalIcons.flatMap((icon) => {
      const numCopies = Math.floor(Math.random() * 10) + 1;
      return Array.from({ length: numCopies }, () => ({
        icon,
        startX: Math.random() * 100,
        startY: Math.random() * 80,
        moveX: (Math.random() - 0.5) * 500,
        moveY: (Math.random() - 0.5) * 500,
        duration: 30 + Math.random(),
        delay: Math.random(),
        size: 1 + Math.random() * 2,
      }));
    });
  }, []);

  return (
    <div>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {duplicatedIcons.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0.6,
                x: 0,
                y: 0,
              }}
              animate={{
                x: item.moveX,
                y: item.moveY,
              }}
              transition={{
                x: {
                  duration: item.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                y: {
                  duration: item.duration * 0.25, // Different timing for Y axis
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                delay: item.delay,
              }}
              className="absolute text-primary opacity-10"
              style={{
                fontSize: `${item.size}rem`, // 1-3rem size
                left: `${item.startX}%`,
                top: `${item.startY}%`,
              }}
            >
              {item.icon}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundAnime;
