import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateRangePicker = ({ onStartChange, onEndChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onStartChange(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onEndChange(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ marginRight: "10px" }}
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;
