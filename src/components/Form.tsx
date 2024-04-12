import React, { useState } from "react";
import TextField from "./formComponents/TextField";
import EmailField from "./formComponents/EmailField";
import AgeSlider from "./formComponents/AgeSlider";
import FileUpload from "./formComponents/FileUpload";
import CalendarField from "./formComponents/CalendarField";

const Form: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [age, setAge] = useState<number>(8);
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [sliderAgeIndicator, setSliderAgeIndicator] = useState(0);
  const isFormValid = Boolean(
    firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      isValid &&
      age &&
      selectedDay &&
      selectedHour &&
      photo
  );

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleAgeChange = (value: number) => {
    setAge(value);
  };

  const handleDayChange = (date: Date | null) => {
    setSelectedDay(date);
  };
  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
  };

  const handlePhotoChange = (file: File | null) => {
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("age", String(age));
    if (photo) {
      formData.append("photo", photo);
    }
    if (selectedDay) {
      formData.append("selectedDay", selectedDay.toISOString());
    }
    formData.append("selectedHour", selectedHour);

    try {
      const response = await fetch("http://letsworkout.pl/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAge(8);
        setPhoto(null);
        setSelectedDay(null);
        setSelectedHour("");
      } else {
        console.error("An error occurred while sending data");
      }
    } catch (error) {
      // Zrobiłem również tutaj czyszczenie state tak jak przy pomyślnym wysłaniu danych ponieważ ten endpoint nie działa a chciałem by formularz dobrze wyglądał i czyścił się po jego wysłaniu
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge(8);
      setPhoto(null);
      setSelectedDay(null);
      setSelectedHour("");
      setSliderAgeIndicator(0);
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="mx-6 xs:mx-8 sm:mx-44 md:mx-56 lg:mx-90 xl:mx-144 2xl:mx-192 pt-12 pb-12">
      <form onSubmit={handleSubmit} noValidate>
        <h1 className=" pb-4 text-[24px] text-primary-text-color font-medium">
          Personal info
        </h1>
        <TextField
          label="First Name"
          value={firstName}
          type="text"
          onChange={handleFirstNameChange}
        />
        <TextField
          label="Last Name"
          value={lastName}
          type="text"
          onChange={handleLastNameChange}
        />
        <EmailField
          label="Email Address"
          value={email}
          type="email"
          onChange={handleEmailChange}
          isEmailValid={isValid}
          setIsEmailValid={setIsValid}
        />
        <AgeSlider
          value={age}
          onChange={handleAgeChange}
          label="Age"
          sliderAgeIndicator={sliderAgeIndicator}
          setSliderAgeIndicator={setSliderAgeIndicator}
        />
        <FileUpload value={photo} onChange={handlePhotoChange} />
        <CalendarField
          selectedDay={selectedDay}
          selectedHour={selectedHour}
          handleDayChange={handleDayChange}
          handleHourChange={handleHourChange}
        />
        <button
          type="submit"
          className={`w-full text-[18px] font-[500] cursor-pointer  ${
            isFormValid ? "bg-custom-purple" : "bg-custom-light-purple"
          } text-white px-4 py-2 rounded hover:bg-custom-purple-hovered mt-4 mb-6`}
          disabled={!isFormValid}
        >
          Send Application
        </button>
      </form>
    </div>
  );
};

export default Form;
