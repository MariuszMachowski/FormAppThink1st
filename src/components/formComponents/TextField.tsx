import React, { useState } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  type,
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
  };

  return (
    <div className="mb-4 text-primary-text-color">
      <label htmlFor={label.toLowerCase()} className="block mb-1 ">
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
          border: isFocused ? "2px solid #761BE4" : "1px solid #CBB6E5",
        }}
      />
    </div>
  );
};

export default TextField;
