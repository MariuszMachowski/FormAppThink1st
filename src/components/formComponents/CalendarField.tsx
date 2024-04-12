import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InfoIcon } from "../../icons";
interface CalendarFieldProps {
  selectedDay: Date | null;
  selectedHour: string;
  handleDayChange: (date: Date | null) => void;
  handleHourChange: (hour: string) => void;
}
interface Holiday {
  country: string;
  date: string;
  day: string;
  iso: string;
  name: string;
  type: string;
  year: number;
}
const CalendarField: React.FC<CalendarFieldProps> = ({
  selectedDay,
  selectedHour,
  handleDayChange,
  handleHourChange,
}) => {
  const [nationalHolidays, setNationalHolidays] = useState<Holiday[]>([]);
  const [observanceDays, setObservanceDays] = useState<Holiday[]>([]);
  const [holidayName, setHolidayName] = useState<string>("");
  const [trainingHours, setTrainingHours] = useState<string[]>([]);
  const country = "PL";
  const year = "2024";
  const apiKey = "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`;
        const response = await fetch(url, {
          headers: {
            "X-Api-Key": apiKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const nationalHolidaysArr = data.filter(
            (item: Holiday) => item.type === "NATIONAL_HOLIDAY"
          );
          const observanceDaysArr = data.filter(
            (item: Holiday) => item.type === "OBSERVANCE"
          );

          setNationalHolidays(nationalHolidaysArr);
          setObservanceDays(observanceDaysArr);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  const handleDateChange = (date: Date) => {
    handleDayChange(date);
    const observanceDay: Holiday | undefined = observanceDays.find(
      (holiday: Holiday) =>
        new Date(holiday.date).toDateString() === date.toDateString()
    );
    console.log(observanceDay);
    if (observanceDay) {
      setHolidayName(observanceDay.name);
    } else {
      setHolidayName("");
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const generatedHours = new Set<string>();
      const hours: string[] = [];
      const numHours = Math.floor(Math.random() * 3) + 4;
      while (generatedHours.size < numHours) {
        const hour = Math.floor(Math.random() * 11) + 10;
        const minute = Math.floor(Math.random() * 4) * 15;
        const time = `${hour}:${minute === 0 ? "00" : minute}`;
        generatedHours.add(time);
      }

      generatedHours.forEach((time) => hours.push(time));

      hours.sort((a, b) => {
        const [hourA, minuteA] = a.split(":").map(Number);
        const [hourB, minuteB] = b.split(":").map(Number);
        if (hourA !== hourB) {
          return hourA - hourB;
        } else {
          return minuteA - minuteB;
        }
      });
      setTrainingHours(hours);
    }
  }, [selectedDay]);

  const renderTimeButtons = (hours: string[]) => {
    return hours.map((hour) => (
      <button
        key={hour}
        type="button"
        className="mx-[3px] bg-white p-2 my-1 border border-[#cbb6e5] rounded-lg w-mobile-flex-children lg:w-full lg:my-[3px] lg:mx-[0] "
        style={{
          border: ` ${
            selectedHour === hour ? "2px solid #761BE4" : "1px solid #cbb6e5"
          }`,
        }}
        onClick={() => handleHourChange(hour)}
      >
        {hour}
      </button>
    ));
  };
  const isDisabled = (date: Date) => {
    return nationalHolidays.some(
      (holiday: Holiday) =>
        new Date(holiday.date).toDateString() === date.toDateString()
    );
  };
  const dayInfo = (
    <div className="flex items-center mt-2 mb-3 ml-0.5 lg:absolute lg:bottom-[-40px]">
      <InfoIcon />
      <h3 className="mx-1 font-medium text-sm">it is {holidayName}</h3>
    </div>
  );

  return (
    <div className="mb-4">
      <h1 className="font-medium text-md mt-8 mb-4 text-primary-text-color text-[24px] lg:mb-8 ">
        Your workout
      </h1>
      <div className="flex flex-col lg:flex-row lg:flex-no-wrap lg:relative lg:mb-10 ">
        <label className="mb-1 lg:absolute lg:mt-[-25px]">Date</label>
        <DatePicker
          selected={selectedDay}
          onChange={handleDateChange}
          inline
          filterDate={(date) => {
            return !isSunday(date) && !isDisabled(date);
          }}
        />
        {holidayName && dayInfo}
        <div className="lg:w-[60px] lg:ml-[15px] mt-1 lg:mt-0">
          {selectedDay && (
            <label className="lg:absolute lg:mt-[-25px] ">Time</label>
          )}
          <div className="time-buttons-container flex justify-start flex-wrap lg:mt-[-2px]">
            {renderTimeButtons(trainingHours)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarField;
