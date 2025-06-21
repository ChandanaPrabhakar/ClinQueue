import React from "react";
import { LuStethoscope } from "react-icons/lu";

const Logo = () => {
  return (
    <div>
      <div className="flex items-center font-logo text-2xl sm:text-3xl md:text-4xl absolute top-4 sm:top-5 left-4 sm:left-5 gap-1 sm:gap-2">
        <LuStethoscope />
        <h1>ClinQueue</h1>
      </div>
    </div>
  );
};

export default Logo;
