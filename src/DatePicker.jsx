import React, { useState, useEffect, useRef } from "react";

const DatePicker = ({
  onDateSelect,
  placeholder = "Select date",
  format = "simple", // "simple", "iso", "range"
  separator = "/", // user can change "/" to "-" or other separators
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light", // "light", "dark"
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState("");

  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Theme classes
  const themes = {
    light: {
      container: "bg-white border-gray-300 text-gray-900",
      calendar: "bg-white border-gray-200 shadow-lg",
      header: "bg-gray-50 text-gray-800",
      day: "hover:bg-blue-50 text-gray-700",
      selectedDay: "bg-blue-500 text-white",
      todayDay: "bg-blue-100 text-blue-800",
      outsideDay: "text-gray-400",
      input: "text-gray-900 placeholder-gray-500",
    },
    dark: {
      container: "bg-gray-800 border-gray-600 text-white",
      calendar: "bg-gray-800 border-gray-600 shadow-lg",
      header: "bg-gray-700 text-white",
      day: "hover:bg-gray-600 text-gray-300",
      selectedDay: "bg-blue-600 text-white",
      todayDay: "bg-blue-800 text-blue-200",
      outsideDay: "text-gray-600",
      input: "text-white placeholder-gray-400",
    },
  };

  const currentTheme = themes[theme];

  // Format date for display (UI format) - MM/DD/YYYY
  const formatForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}${separator}${day}${separator}${year}`;
  };

  // Format date based on selected format type
  const formatDate = (dateString, formatType) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    switch (formatType) {
      case "simple":
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${separator}${month}${separator}${day}`;

      case "iso":
        // For ISO format, we need to determine if this is a start or end date
        // Since we can't know context here, we'll store as start of day
        // The DateRangePicker will handle the end date formatting
        const isoDate = new Date(date);
        isoDate.setUTCHours(0, 0, 0, 0);
        return isoDate.toISOString();

      case "range":
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);
        return {
          start: startOfDay.toISOString(),
          end: endOfDay.toISOString(),
        };

      default:
        return dateString;
    }
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    // Create a date string in YYYY-MM-DD format without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    setSelectedDate(dateString);

    const displayFormat = formatForDisplay(dateString);
    setDisplayDate(displayFormat);
    setInputValue(displayFormat);

    const formattedDate = formatDate(dateString, format);
    onDateSelect && onDateSelect(formattedDate);
    setShowCalendar(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setShowCalendar(true);
    }
  };

  const handleInputBlur = () => {
    // Validate and format input
    const input = inputValue.trim();
    if (input) {
      // Try to parse the input date
      const parsedDate = new Date(input);
      if (!isNaN(parsedDate.getTime())) {
        // Create date string in YYYY-MM-DD format without timezone conversion
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        // Check if date is within restrictions
        if (!isDateDisabled(parsedDate)) {
          setSelectedDate(dateString);
          const displayFormat = formatForDisplay(dateString);
          setDisplayDate(displayFormat);
          setInputValue(displayFormat);

          const formattedDate = formatDate(dateString, format);
          onDateSelect && onDateSelect(formattedDate);
        } else {
          // Date is disabled, revert to previous value
          setInputValue(displayDate);
        }
      } else {
        // Invalid date, revert to previous value
        setInputValue(displayDate);
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    handleDateSelect(today);
  };

  const isDateDisabled = (date) => {
    if (minDate) {
      const minDateObj = new Date(minDate);
      const compareDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const compareMin = new Date(
        minDateObj.getFullYear(),
        minDateObj.getMonth(),
        minDateObj.getDate()
      );
      if (compareDate < compareMin) return true;
    }

    if (maxDate) {
      const maxDateObj = new Date(maxDate);
      const compareDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const compareMax = new Date(
        maxDateObj.getFullYear(),
        maxDateObj.getMonth(),
        maxDateObj.getDate()
      );
      if (compareDate > compareMax) return true;
    }

    return false;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    const selectedDateObj = new Date(selectedDate);
    return (
      date.getFullYear() === selectedDateObj.getFullYear() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getDate() === selectedDateObj.getDate()
    );
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update display when separator changes
  useEffect(() => {
    if (selectedDate) {
      const displayFormat = formatForDisplay(selectedDate);
      setDisplayDate(displayFormat);
      setInputValue(displayFormat);
    }
  }, [separator, selectedDate]);

  // Update current month when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${currentTheme.container} ${currentTheme.input}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        />

        {/* Calendar Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className={`
            absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border transition-all duration-200
            ${currentTheme.calendar}
          `}
        >
          {/* Calendar Header */}
          <div
            className={`flex items-center justify-between p-4 rounded-t-lg ${currentTheme.header}`}
          >
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h2 className="text-lg font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>

            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {getDaysInMonth(currentMonth).map((dayObj, index) => {
              const { date, isCurrentMonth } = dayObj;
              const isDisabled = isDateDisabled(date);
              const isTodayDate = isToday(date);
              const isSelectedDate = isSelected(date);

              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    h-10 w-10 rounded-lg text-sm font-medium transition-all duration-150
                    ${
                      isSelectedDate
                        ? currentTheme.selectedDay
                        : isTodayDate
                        ? currentTheme.todayDay
                        : isCurrentMonth
                        ? currentTheme.day
                        : currentTheme.outsideDay
                    }
                    ${
                      isDisabled
                        ? "opacity-25 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${!isSelectedDate && !isDisabled ? "hover:scale-110" : ""}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-4 border-t">
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Today
            </button>

            <div className="text-xs text-gray-500">
              Format: {format} | Sep: {separator}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
