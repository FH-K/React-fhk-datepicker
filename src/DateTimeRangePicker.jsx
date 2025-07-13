import React, { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker.jsx";

const DateTimeRangePicker = ({
  onDateTimeRangeSelect,
  startDatePlaceholder = "Start date",
  endDatePlaceholder = "End date",
  startTimePlaceholder = "Start time",
  endTimePlaceholder = "End time",
  format = "simple", // "simple", "iso", "range"
  separator = "/",
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light",
  startDate = null,
  endDate = null,
  startTime = null,
  endTime = null,
}) => {
  const [startDateValue, setStartDateValue] = useState(startDate || "");
  const [endDateValue, setEndDateValue] = useState(endDate || "");
  const [startTimeValue, setStartTimeValue] = useState(startTime || "");
  const [endTimeValue, setEndTimeValue] = useState(endTime || "");

  // Handle date range selection
  const handleDateRangeSelect = (range) => {
    setStartDateValue(range.start || "");
    setEndDateValue(range.end || "");

    // Format dates with times for ISO format
    let formattedStartDate = range.start;
    let formattedEndDate = range.end;

    if (format === "iso" && range.start && startTimeValue) {
      // Combine date and time for start
      const startDateTime = new Date(range.start);
      const [startHours, startMinutes, startSeconds] = startTimeValue
        .split(":")
        .map(Number);
      startDateTime.setUTCHours(startHours, startMinutes, startSeconds || 0, 0);
      formattedStartDate = startDateTime.toISOString();
    }

    if (format === "iso" && range.end && endTimeValue) {
      // Combine date and time for end
      const endDateTime = new Date(range.end);
      const [endHours, endMinutes, endSeconds] = endTimeValue
        .split(":")
        .map(Number);
      endDateTime.setUTCHours(endHours, endMinutes, endSeconds || 0, 999);
      formattedEndDate = endDateTime.toISOString();
    }

    // Call parent callback with full date-time range
    const dateTimeRange = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      startTime: startTimeValue,
      endTime: endTimeValue,
      isValid:
        range.isValid &&
        ((!startTimeValue && !endTimeValue) ||
          (startTimeValue &&
            endTimeValue &&
            (range.start === range.end
              ? !isTimeBefore(endTimeValue, startTimeValue)
              : true))),
    };

    onDateTimeRangeSelect && onDateTimeRangeSelect(dateTimeRange);
  };

  // Handle start time selection
  const handleStartTimeChange = (e) => {
    const time = e.target.value;
    setStartTimeValue(time);

    // If end time is before start time, clear end time
    if (endTimeValue && isTimeBefore(endTimeValue, time)) {
      setEndTimeValue("");
    }

    // Format start date with time for ISO format
    let formattedStartDate = startDateValue;
    if (format === "iso" && startDateValue && time) {
      const startDateTime = new Date(startDateValue);
      const [hours, minutes, seconds] = time.split(":").map(Number);
      startDateTime.setUTCHours(hours, minutes, seconds || 0, 0);
      formattedStartDate = startDateTime.toISOString();
    }

    // Call parent callback
    const dateTimeRange = {
      startDate: formattedStartDate,
      endDate: endDateValue,
      startTime: time,
      endTime: endTimeValue,
      isValid:
        !!startDateValue &&
        !!endDateValue &&
        ((!time && !endTimeValue) ||
          (time &&
            endTimeValue &&
            (startDateValue === endDateValue
              ? !isTimeBefore(endTimeValue, time)
              : true))),
    };

    onDateTimeRangeSelect && onDateTimeRangeSelect(dateTimeRange);
  };

  // Handle end time selection
  const handleEndTimeChange = (e) => {
    const time = e.target.value;
    setEndTimeValue(time);

    // Format end date with time for ISO format
    let formattedEndDate = endDateValue;
    if (format === "iso" && endDateValue && time) {
      const endDateTime = new Date(endDateValue);
      const [hours, minutes, seconds] = time.split(":").map(Number);
      endDateTime.setUTCHours(hours, minutes, seconds || 0, 999);
      formattedEndDate = endDateTime.toISOString();
    }

    // Call parent callback
    const dateTimeRange = {
      startDate: startDateValue,
      endDate: formattedEndDate,
      startTime: startTimeValue,
      endTime: time,
      isValid:
        !!startDateValue &&
        !!endDateValue &&
        ((!startTimeValue && !time) ||
          (startTimeValue &&
            time &&
            (startDateValue === endDateValue
              ? !isTimeBefore(startTimeValue, time)
              : true))),
    };

    onDateTimeRangeSelect && onDateTimeRangeSelect(dateTimeRange);
  };

  // Helper function to compare times
  const isTimeBefore = (time1, time2) => {
    if (!time1 || !time2) return false;

    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + (seconds1 || 0);
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + (seconds2 || 0);

    return totalSeconds1 < totalSeconds2;
  };

  // Update when external props change
  useEffect(() => {
    if (startDate !== startDateValue) {
      setStartDateValue(startDate || "");
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate !== endDateValue) {
      setEndDateValue(endDate || "");
    }
  }, [endDate]);

  useEffect(() => {
    if (startTime !== startTimeValue) {
      setStartTimeValue(startTime || "");
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime !== endTimeValue) {
      setEndTimeValue(endTime || "");
    }
  }, [endTime]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Date Range Picker */}
      <DateRangePicker
        onRangeSelect={handleDateRangeSelect}
        startPlaceholder={startDatePlaceholder}
        endPlaceholder={endDatePlaceholder}
        format={format}
        separator={separator}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        theme={theme}
        startDate={startDateValue}
        endDate={endDateValue}
      />

      {/* Time Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time
          </label>
          <input
            type="time"
            step="1"
            value={startTimeValue}
            onChange={handleStartTimeChange}
            placeholder={startTimePlaceholder}
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

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Time
          </label>
          <input
            type="time"
            step="1"
            value={endTimeValue}
            onChange={handleEndTimeChange}
            placeholder={endTimePlaceholder}
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
      </div>

      {/* DateTime Range Display */}
      {(startDateValue || endDateValue || startTimeValue || endTimeValue) && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <strong>Selected Date-Time Range:</strong>
            <div className="mt-1 font-mono text-xs">
              {startDateValue
                ? `Start Date: ${startDateValue}`
                : "Start Date: Not selected"}
              {startTimeValue && ` | Time: ${startTimeValue}`}
            </div>
            <div className="font-mono text-xs">
              {endDateValue
                ? `End Date: ${endDateValue}`
                : "End Date: Not selected"}
              {endTimeValue && ` | Time: ${endTimeValue}`}
            </div>
            {startDateValue && endDateValue && (
              <div className="mt-2 text-xs">
                {(startTimeValue && !endTimeValue) ||
                (!startTimeValue && endTimeValue) ? (
                  <span className="text-red-600">
                    ❌ Invalid: Both start and end times must be selected
                    together
                  </span>
                ) : startDateValue === endDateValue &&
                  startTimeValue &&
                  endTimeValue &&
                  isTimeBefore(endTimeValue, startTimeValue) ? (
                  <span className="text-red-600">
                    ❌ Invalid time range (end time before start time)
                  </span>
                ) : (
                  <span className="text-green-600">
                    ✅ Valid date-time range
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeRangePicker;
