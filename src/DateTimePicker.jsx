import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker.jsx";
import TimePicker from "./TimePicker.jsx"; // Import the enhanced TimePicker

const DateTimePicker = ({
  onDateTimeSelect,
  datePlaceholder = "Select date",
  timePlaceholder = "Select time",
  format = "simple", // "simple", "iso", "range"
  separator = "/",
  className = "",
  calendarClassName = "", // Custom className for calendar popup
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light",
  date = null,
  time = null,
  // Enhanced props
  size = "md", // "sm", "md", "lg"
  variant = "outline", // "outline", "filled", "ghost"
  showClearButton = true,
  showTodayButton = true,
  autoFocus = false,
  error = false,
  helperText = "",
  timeFormat = "24", // "12" or "24"
  timeStep = "1", // "1" for seconds, "60" for minutes only
}) => {
  const [dateValue, setDateValue] = useState(date || "");
  const [timeValue, setTimeValue] = useState(time || "");

  // Handle date selection
  const handleDateSelect = (selectedDate) => {
    setDateValue(selectedDate);

    // Call parent callback with date-time
    const dateTime = {
      date: selectedDate,
      time: timeValue,
      isValid: !!selectedDate,
    };

    onDateTimeSelect && onDateTimeSelect(dateTime);
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setTimeValue(time);

    // Call parent callback
    const dateTime = {
      date: dateValue,
      time: time,
      isValid: !!dateValue,
    };

    onDateTimeSelect && onDateTimeSelect(dateTime);
  };

  // Update when external props change
  useEffect(() => {
    if (date !== dateValue) {
      setDateValue(date || "");
    }
  }, [date]);

  useEffect(() => {
    if (time !== timeValue) {
      setTimeValue(time || "");
    }
  }, [time]);

  return (
    <div className={`${className}`}>
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Picker */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Date
          </label>
          <DatePicker
            onDateSelect={handleDateSelect}
            placeholder={datePlaceholder}
            format={format}
            separator={separator}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            theme={theme}
            size={size}
            variant={variant}
            showClearButton={showClearButton}
            showTodayButton={showTodayButton}
            autoFocus={autoFocus}
            error={error}
            helperText={helperText}
            calendarClassName={calendarClassName}
          />
        </div>

        {/* Enhanced Time Picker */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            🕐 Time
          </label>
          <TimePicker
            value={timeValue}
            onChange={handleTimeChange}
            placeholder={timePlaceholder}
            disabled={disabled}
            theme={theme}
            size={size}
            variant={variant}
            format={timeFormat}
            step={timeStep}
            error={error}
            helperText=""
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
