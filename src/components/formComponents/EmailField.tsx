import React, { useState } from "react";
import { ErrorIcon } from "../../icons";

interface TextFieldProps {
  label: string;
  value: string;
  type: string;
  isEmailValid: boolean;
  onChange: (value: string) => void;
  setIsEmailValid: (value: boolean) => void;
}

const EmailField: React.FC<TextFieldProps> = ({
  label,
  value,
  isEmailValid,
  type,
  onChange,
  setIsEmailValid,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    const atIndex = inputValue.indexOf("@");
    setIsEmailValid(atIndex > -1 && atIndex < inputValue.length - 1);
  };

  return (
    <div className="mb-4 text-primary-text-color">
      <label htmlFor={label.toLowerCase()} className="block mb-1">
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-4 py-2  focus:outline-none h-12 rounded-lg `}
        style={{
          border: isFocused
            ? "2px solid #761BE4"
            : !isEmailValid
            ? "2px solid red"
            : "1px solid #CBB6E5",
          backgroundColor: isFocused
            ? "#fff"
            : !isEmailValid
            ? "#feecec"
            : "#fff",
        }}
      />
      {!isEmailValid && !isFocused && (
        <div className="text-red-500 flex items-center my-1">
          <ErrorIcon />
          <p className="ml-1">Invalid email address</p>
        </div>
      )}
    </div>
  );
};

export default EmailField;
