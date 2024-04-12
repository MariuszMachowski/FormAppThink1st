import React, { useRef, useEffect } from "react";

interface AgeSliderProps {
  value: number;
  label: string;
  sliderAgeIndicator: number;
  onChange: (value: number) => void;
  setSliderAgeIndicator: (value: number) => void;
}

const AgeSlider: React.FC<AgeSliderProps> = ({
  value,
  onChange,
  label,
  sliderAgeIndicator,
  setSliderAgeIndicator,
}) => {
  const rangeInputRef: any = useRef();
  const margin = sliderAgeIndicator === 0 ? 8 : 8 + sliderAgeIndicator * 0.2;

  const leftValue =
    sliderAgeIndicator === 100
      ? "calc(100% - 28px)"
      : `calc(${sliderAgeIndicator}% - ${margin}px)`;

  useEffect(() => {
    if (sliderAgeIndicator === 0) {
      rangeInputRef.current.style.background =
        "linear-gradient(to right, #761be4 0%, #761be4 0%, #cbb6e5 0%, #cbb6e5 100%)";
    }
  }, [sliderAgeIndicator]);

  return (
    <div className="mb-4 field-group relative">
      <label
        htmlFor="age"
        className="block mb-2 range-label text-primary-text-color"
      >
        {label}
      </label>

      <div className="-mt-2 flex w-full justify-between mb-[-5px] ">
        <span className="text-sm mx-1 text-primary-text-color text-[12px]">
          8
        </span>
        <span className="text-sm mx-1 text-primary-text-color text-[12px]">
          100
        </span>
      </div>
      <input
        ref={rangeInputRef}
        min={8}
        max={100}
        type="range"
        className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg h-[7px] w-full outline-none appearance-none"
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
          let value =
            ((rangeInputRef.current.value - rangeInputRef.current.min) /
              (rangeInputRef.current.max - rangeInputRef.current.min)) *
            100;
          setSliderAgeIndicator(value);
          rangeInputRef.current.style.background =
            "linear-gradient(to right, #761be4 0%, #761be4 " +
            value +
            "%, #cbb6e5 " +
            value +
            "%, #cbb6e5 100%)";
        }}
      />
      <span
        className="bg-white border text-[12px] text-custom-purple font-medium border-custom-light-purple mt-[11px] w-[35px] h-[25px] relative flex items-center justify-center rounded-md age-info"
        style={{
          position: "relative",
          left: leftValue,
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default AgeSlider;
