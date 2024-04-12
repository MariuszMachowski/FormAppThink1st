import React, { useRef } from "react";
import { DeleteIcon } from "../../icons";

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ value, onChange }) => {
  const imageRef: React.RefObject<HTMLInputElement> = useRef(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      onChange(selectedFile);
      e.target.value = "";
    }
  };

  return (
    <div className="mb-4 wrapper">
      <input
        ref={imageRef}
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
        aria-labelledby="file-label"
      />
      <div className="relative bg-white text-white text-center text-18px w-full h-20 py-18px px-18px rounded-lg mx-auto flex justify-center items-center border border-[#cbb6e5]">
        <label
          htmlFor="file-input"
          className="file-input-label cursor-pointer text-[14px] mr-[5px] "
          id="file-label"
          style={{
            color: value?.name ? "#000853" : "#761BE4",
            borderBottom: value?.name ? "none" : "2px solid #761BE4",
            fontWeight: value?.name ? "500" : "normal",
          }}
        >
          {value?.name || "Upload a file"}
        </label>
        {value?.name && (
          <button onClick={() => onChange(null)}>
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
