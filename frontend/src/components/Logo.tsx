import React from "react";
import { LuStethoscope } from "react-icons/lu";

const Logo = () => {
  return (
    <div>
      <div className="flex font-logo text-4xl absolute top-5 left-5 gap-2">
        <LuStethoscope />
        <h1>ClinQueue</h1>
      </div>
    </div>
  );
};

export default Logo;
