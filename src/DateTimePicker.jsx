import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker.jsx";

const DateTimePicker = ({
  onDateTimeSelect,
  datePlaceholder = "Select date",
  timePlaceholder = "Select time",
  format = "simple", // "simple", "iso", "range"
  separator = "/",
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light",
  date = null,
  time = null,
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
    <div className={`space-y-4 ${className}`}>
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
        />
      </div>

      {/* Time Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time
        </label>
        <input
          type="time"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          placeholder={timePlaceholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        />
      </div>

      {/* DateTime Display */}
      {(dateValue || timeValue) && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-purple-800">
            <strong>Selected Date-Time:</strong>
            <div className="mt-1 font-mono text-xs">
              {dateValue ? `Date: ${dateValue}` : "Date: Not selected"}
              {timeValue && ` | Time: ${timeValue}`}
            </div>
            {dateValue && (
              <div className="mt-2 text-xs">
                <span className="text-green-600">✅ Valid date-time</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
