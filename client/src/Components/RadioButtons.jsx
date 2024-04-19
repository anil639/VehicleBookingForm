import React from "react";
import Radio from "@mui/material/Radio";

const RadioButtons = ({ label, options, value, onChange }) => {
  const handleOptionChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label>{label}:</label>
      {options.map((option) => (
        <div
          key={option}
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <Radio
            type="radio"
            id={option}
            name={label}
            value={option}
            checked={value === option}
            onChange={handleOptionChange}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;
