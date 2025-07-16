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
    <div className={`space-y-4 ${className}`}>
      {/* Date Picker */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          📅 Date
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

      {/* DateTime Display */}
      {(dateValue || timeValue) && (
        <div
          className={`mt-4 p-4 rounded-xl border-2 transition-all duration-200 ${
            theme === "dark"
              ? "bg-purple-900/30 border-purple-700"
              : "bg-purple-50 border-purple-200"
          }`}
        >
          <div
            className={`text-sm ${
              theme === "dark" ? "text-purple-300" : "text-purple-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✨</span>
              <strong>Selected Date-Time</strong>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                className={`p-3 rounded-lg font-mono text-xs ${
                  theme === "dark" ? "bg-purple-800/50" : "bg-purple-100"
                }`}
              >
                <div className="font-medium text-xs uppercase tracking-wide mb-1 opacity-75">
                  Date
                </div>
                {dateValue || "Not selected"}
              </div>
              <div
                className={`p-3 rounded-lg font-mono text-xs ${
                  theme === "dark" ? "bg-purple-800/50" : "bg-purple-100"
                }`}
              >
                <div className="font-medium text-xs uppercase tracking-wide mb-1 opacity-75">
                  Time
                </div>
                {timeValue || "Not selected"}
              </div>
            </div>
            {dateValue && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-xs font-medium">
                  Valid date-time combination
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
