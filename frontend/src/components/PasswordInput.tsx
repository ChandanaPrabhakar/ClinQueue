import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent rounded outline-none"
      />

      {showPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-primary"
          onClick={toggleShowPassword}
          aria-label="Hide password"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
          aria-label="Show password"
        />
      )}
    </div>
  );
};

export default PasswordInput;
