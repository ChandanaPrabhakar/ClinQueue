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
    <div className="flex items-center w-full border rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-primary bg-white max-sm:px-2 max-sm:py-1">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent rounded outline-none max-sm:text-xs"
      />

      {showPassword ? (
        <FaRegEye
          size={20}
          className="cursor-pointer text-primary"
          onClick={toggleShowPassword}
          aria-label="Hide password"
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
          aria-label="Show password"
        />
      )}
    </div>
  );
};

export default PasswordInput;
