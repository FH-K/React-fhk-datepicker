import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import TimePicker from "./TimePicker.jsx"; // Import the enhanced TimePicker

const DateTimeRangePicker = ({
  onDateTimeRangeSelect,
  startDatePlaceholder = "Start date",
  endDatePlaceholder = "End date",
  startTimePlaceholder = "Start time",
  endTimePlaceholder = "End time",
  format = "simple", // "simple", "iso", "range"
  separator = "/",
  className = "",
  calendarClassName = "", // Custom className for calendar popup
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light",
  startDate = null,
  endDate = null,
  startTime = null,
  endTime = null,
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
  const [startDateValue, setStartDateValue] = useState(startDate || "");
  const [endDateValue, setEndDateValue] = useState(endDate || "");
  const [startTimeValue, setStartTimeValue] = useState(startTime || "");
  const [endTimeValue, setEndTimeValue] = useState(endTime || "");

  // Handle date range selection
  const handleDateRangeSelect = (range) => {
    setStartDateValue(range.start || "");
    setEndDateValue(range.end || "");

    // Format dates for ISO format
    let formattedStartDate = range.start;
    let formattedEndDate = range.end;

    if (format === "iso" && range.start && startTimeValue) {
      const startDateTime = new Date(range.start);
      const [startHours, startMinutes, startSeconds] = startTimeValue
        .split(":")
        .map(Number);
      startDateTime.setUTCHours(startHours, startMinutes, startSeconds || 0, 0);
      formattedStartDate = startDateTime.toISOString();
    }

    if (format === "iso" && range.end && endTimeValue) {
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

    // If end time is before start time on same date, clear end time
    if (
      endTimeValue &&
      startDateValue === endDateValue &&
      isTimeBefore(endTimeValue, time)
    ) {
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
      isValid: validateDateTimeRange(
        startDateValue,
        endDateValue,
        time,
        endTimeValue
      ),
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
      isValid: validateDateTimeRange(
        startDateValue,
        endDateValue,
        startTimeValue,
        time
      ),
    };

    onDateTimeRangeSelect && onDateTimeRangeSelect(dateTimeRange);
  };

  // Helper function to compare dates properly
  const isDateBefore = (date1, date2) => {
    if (!date1 || !date2) return false;

    // Convert to Date objects for proper comparison
    let d1, d2;

    if (typeof date1 === "string") {
      // Handle different date formats
      if (date1.includes("T")) {
        // ISO format
        d1 = new Date(date1);
      } else {
        // Simple format (YYYY/MM/DD or YYYY-MM-DD)
        const parts = date1.split(/[\/\-]/);
        if (parts.length === 3) {
          d1 = new Date(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2])
          );
        } else {
          d1 = new Date(date1);
        }
      }
    } else {
      d1 = new Date(date1);
    }

    if (typeof date2 === "string") {
      // Handle different date formats
      if (date2.includes("T")) {
        // ISO format
        d2 = new Date(date2);
      } else {
        // Simple format (YYYY/MM/DD or YYYY-MM-DD)
        const parts = date2.split(/[\/\-]/);
        if (parts.length === 3) {
          d2 = new Date(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2])
          );
        } else {
          d2 = new Date(date2);
        }
      }
    } else {
      d2 = new Date(date2);
    }

    // Compare dates by setting time to 00:00:00 for accurate comparison
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return d1 < d2;
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

  // Validate complete date-time range
  const validateDateTimeRange = (startDate, endDate, startTime, endTime) => {
    if (!startDate || !endDate) return false;

    // If dates are different, times don't matter for validity
    if (startDate !== endDate) return true;

    // If same date, check time validity
    if (!startTime || !endTime) return true; // Allow missing times

    return !isTimeBefore(endTime, startTime);
  };

  // Calculate duration helper
  const calculateDuration = (startDate, endDate, startTime, endTime) => {
    if (!startDate || !endDate || !startTime || !endTime) return "N/A";

    try {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      const diffMs = end - start;

      if (diffMs < 0) return "Invalid";

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (diffHours === 0) {
        return `${diffMinutes} minutes`;
      } else if (diffHours < 24) {
        return `${diffHours}h ${diffMinutes}m`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        const remainingHours = diffHours % 24;
        return `${diffDays}d ${remainingHours}h ${diffMinutes}m`;
      }
    } catch (error) {
      return "N/A";
    }
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
      {/* Combined Date-Time Range Picker */}
      <div
        className={`p-4 rounded-xl border-2 ${
          theme === "dark"
            ? "bg-gray-800/50 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Start Date */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Start Date
            </label>
            <DatePicker
              onDateSelect={(date) => {
                const range = {
                  start: date,
                  end: endDateValue,
                  isValid:
                    !!date &&
                    !!endDateValue &&
                    !isDateBefore(endDateValue, date),
                };
                handleDateRangeSelect(range);
              }}
              placeholder={startDatePlaceholder}
              format={format}
              separator={separator}
              disabled={disabled}
              minDate={minDate}
              maxDate={endDateValue || maxDate}
              theme={theme}
              size={size}
              variant={variant}
              showClearButton={showClearButton}
              showTodayButton={showTodayButton}
              autoFocus={autoFocus}
              error={error}
              helperText=""
              calendarClassName={calendarClassName}
            />
          </div>

          {/* Start Time */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Start Time
            </label>
            <TimePicker
              value={startTimeValue}
              onChange={handleStartTimeChange}
              placeholder={startTimePlaceholder}
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

          {/* End Date */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              End Date
            </label>
            <DatePicker
              onDateSelect={(date) => {
                const range = {
                  start: startDateValue,
                  end: date,
                  isValid:
                    !!startDateValue &&
                    !!date &&
                    !isDateBefore(date, startDateValue),
                };
                handleDateRangeSelect(range);
              }}
              placeholder={endDatePlaceholder}
              format={format}
              separator={separator}
              disabled={disabled}
              minDate={startDateValue || minDate}
              maxDate={maxDate}
              theme={theme}
              size={size}
              variant={variant}
              showClearButton={showClearButton}
              showTodayButton={showTodayButton}
              autoFocus={false}
              error={error}
              helperText=""
              calendarClassName={calendarClassName}
            />
          </div>

          {/* End Time */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              End Time
            </label>
            <TimePicker
              value={endTimeValue}
              onChange={handleEndTimeChange}
              placeholder={endTimePlaceholder}
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
    </div>
  );
};

export default DateTimeRangePicker;
