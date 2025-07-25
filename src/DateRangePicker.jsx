import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker.jsx";

const DateRangePicker = ({
  onRangeSelect,
  startPlaceholder = "Start date",
  endPlaceholder = "End date",
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
  // New props
  size = "md", // "sm", "md", "lg"
  variant = "outline", // "outline", "filled", "ghost"
  showClearButton = true,
  showTodayButton = true,
  autoFocus = false,
  error = false,
  helperText = "",
  bgColorLight,
  bgColorDark,
}) => {
  const [startDateValue, setStartDateValue] = useState(startDate || "");
  const [endDateValue, setEndDateValue] = useState(endDate || "");
  const [formattedEndDate, setFormattedEndDate] = useState(""); // Add state for formatted end date

  // Handle start date selection
  const handleStartDateSelect = (date) => {
    setStartDateValue(date);

    // If end date is before start date, clear end date
    if (endDateValue && isDateBefore(endDateValue, date)) {
      setEndDateValue("");
      setFormattedEndDate("");
    }

    // Call parent callback with range
    const range = {
      start: date,
      end: formattedEndDate || endDateValue,
      isValid: !!endDateValue && !isDateBefore(endDateValue, date),
    };

    onRangeSelect && onRangeSelect(range);
  };

  // Handle end date selection
  const handleEndDateSelect = (date) => {
    setEndDateValue(date);

    // Format end date as end of day if using ISO format
    let formattedEndDate = date;
    if (format === "iso" && date) {
      const endDate = new Date(date);
      endDate.setUTCHours(23, 59, 59, 999);
      formattedEndDate = endDate.toISOString();
    }
    setFormattedEndDate(formattedEndDate);

    // Call parent callback with range
    const range = {
      start: startDateValue,
      end: formattedEndDate,
      isValid: !!startDateValue && !isDateBefore(date, startDateValue),
    };

    onRangeSelect && onRangeSelect(range);
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

  // Get max date for start picker (end date if selected)
  const getStartMaxDate = () => {
    if (endDateValue) {
      return endDateValue;
    }
    return maxDate;
  };

  // Get min date for end picker (start date if selected)
  const getEndMinDate = () => {
    if (startDateValue) {
      return startDateValue;
    }
    return minDate;
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

  return (
    <div
      className={`${className}`}
      style={{
        background:
          theme === "dark" ? bgColorDark || "#1f2937" : bgColorLight || "#fff",
      }}
    >
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            onDateSelect={handleStartDateSelect}
            placeholder={startPlaceholder}
            format={format}
            separator={separator}
            disabled={disabled}
            minDate={minDate}
            maxDate={getStartMaxDate()}
            theme={theme}
            size={size}
            variant={variant}
            showClearButton={showClearButton}
            showTodayButton={showTodayButton}
            autoFocus={autoFocus}
            error={error}
            helperText={helperText}
            date={startDateValue}
            calendarClassName={calendarClassName}
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
            onDateSelect={handleEndDateSelect}
            placeholder={endPlaceholder}
            format={format}
            separator={separator}
            disabled={disabled}
            minDate={getEndMinDate()}
            maxDate={maxDate}
            theme={theme}
            size={size}
            variant={variant}
            showClearButton={showClearButton}
            showTodayButton={showTodayButton}
            autoFocus={false}
            error={error}
            helperText={helperText}
            date={endDateValue}
            calendarClassName={calendarClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
