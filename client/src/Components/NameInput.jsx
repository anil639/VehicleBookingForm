import React from "react";
import { TextField } from "@mui/material";

const NameInput = ({ value, onChange }) => {
  const handleFirstNameChange = (event) => {
    onChange({ ...value, firstName: event.target.value });
  };

  const handleLastNameChange = (event) => {
    onChange({ ...value, lastName: event.target.value });
  };

  return (
    <div>
      <TextField
        required={value.required}
        sx={{ marginRight: "20px" }}
        label="First Name"
        type="text"
        value={value.firstName}
        onChange={handleFirstNameChange}
      />

      <TextField
        required={value.required}
        label="Last Name"
        type="text"
        value={value.lastName}
        onChange={handleLastNameChange}
      />
    </div>
  );
};

export default NameInput;
