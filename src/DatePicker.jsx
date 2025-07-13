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
  size = "md", // "sm", "md", "lg"
  variant = "outline", // "outline", "filled", "ghost"
  showClearButton = true,
  showTodayButton = true,
  autoFocus = false,
  error = false,
  helperText = "",
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Size configurations
  const sizes = {
    sm: {
      input: "px-3 py-2 text-sm",
      calendar: "w-72",
      dayButton: "h-8 w-8 text-xs",
      headerText: "text-base",
      icon: "w-4 h-4",
    },
    md: {
      input: "px-4 py-3 text-base",
      calendar: "w-80",
      dayButton: "h-10 w-10 text-sm",
      headerText: "text-lg",
      icon: "w-5 h-5",
    },
    lg: {
      input: "px-5 py-4 text-lg",
      calendar: "w-96",
      dayButton: "h-12 w-12 text-base",
      headerText: "text-xl",
      icon: "w-6 h-6",
    },
  };

  const currentSize = sizes[size];

  // Variant configurations
  const variants = {
    outline: {
      base: theme === "dark" ? "border-2 bg-gray-800" : "border-2 bg-white",
      normal:
        theme === "dark"
          ? "border-gray-600 hover:border-gray-500"
          : "border-gray-300 hover:border-gray-400",
      focus:
        theme === "dark"
          ? "border-blue-500 ring-4 ring-blue-900"
          : "border-blue-500 ring-4 ring-blue-100",
      error:
        theme === "dark"
          ? "border-red-500 ring-4 ring-red-900"
          : "border-red-500 ring-4 ring-red-100",
      disabled:
        theme === "dark"
          ? "border-gray-700 bg-gray-900"
          : "border-gray-200 bg-gray-50",
    },
    filled: {
      base: theme === "dark" ? "border-0 bg-gray-800" : "border-0 bg-gray-100",
      normal: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200",
      focus:
        theme === "dark"
          ? "bg-gray-900 ring-4 ring-blue-900 shadow-md"
          : "bg-white ring-4 ring-blue-100 shadow-md",
      error:
        theme === "dark"
          ? "bg-red-900/20 ring-4 ring-red-900"
          : "bg-red-50 ring-4 ring-red-100",
      disabled:
        theme === "dark" ? "bg-gray-800 opacity-60" : "bg-gray-100 opacity-60",
    },
    ghost: {
      base: "border-0 bg-transparent",
      normal: theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100",
      focus:
        theme === "dark"
          ? "bg-gray-900 ring-4 ring-blue-900 shadow-lg"
          : "bg-white ring-4 ring-blue-100 shadow-lg",
      error:
        theme === "dark"
          ? "bg-red-900/20 ring-4 ring-red-900"
          : "bg-red-50 ring-4 ring-red-100",
      disabled:
        theme === "dark" ? "bg-gray-900 opacity-60" : "bg-gray-50 opacity-60",
    },
  };

  const currentVariant = variants[variant];

  // Theme classes
  const themes = {
    light: {
      container: "bg-white text-gray-900",
      calendar: "bg-white border-gray-200 shadow-xl",
      calendarGradient: "bg-gradient-to-b from-white to-gray-50",
      header:
        "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-b border-gray-100",
      headerButton: "hover:bg-blue-100 text-blue-600",
      day: "hover:bg-blue-50 text-gray-700 hover:text-blue-600",
      selectedDay:
        "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105",
      todayDay:
        "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold ring-2 ring-blue-300",
      outsideDay: "text-gray-400 hover:text-gray-500",
      input: "text-gray-900 placeholder-gray-500",
      clear: "text-gray-400 hover:text-red-500",
      footer: "bg-gray-50 border-t border-gray-100",
    },
    dark: {
      container: "bg-gray-900 text-white",
      calendar: "bg-gray-900 border-gray-700 shadow-xl shadow-black/20",
      calendarGradient: "bg-gradient-to-b from-gray-900 to-gray-800",
      header:
        "bg-gradient-to-r from-gray-800 to-gray-700 text-white border-b border-gray-600",
      headerButton: "hover:bg-gray-600 text-blue-400",
      day: "hover:bg-gray-700 text-gray-300 hover:text-blue-400",
      selectedDay:
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105",
      todayDay:
        "bg-gradient-to-r from-blue-800 to-blue-900 text-blue-200 font-semibold ring-2 ring-blue-500",
      outsideDay: "text-gray-600 hover:text-gray-500",
      input: "text-white placeholder-gray-400",
      clear: "text-gray-500 hover:text-red-400",
      footer: "bg-gray-800 border-t border-gray-600",
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

  // Get days in month with enhanced layout
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
    setIsAnimating(true);

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

    setTimeout(() => {
      setShowCalendar(false);
      setIsAnimating(false);
    }, 150);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setShowCalendar(true);
      setIsAnimating(true);
    }
  };

  const handleInputBlur = (e) => {
    // Don't close if clicking inside calendar
    if (calendarRef.current && calendarRef.current.contains(e.relatedTarget)) {
      return;
    }

    // Validate and format input
    const input = inputValue.trim();
    if (input) {
      const parsedDate = new Date(input);
      if (!isNaN(parsedDate.getTime())) {
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        if (!isDateDisabled(parsedDate)) {
          setSelectedDate(dateString);
          const displayFormat = formatForDisplay(dateString);
          setDisplayDate(displayFormat);
          setInputValue(displayFormat);

          const formattedDate = formatDate(dateString, format);
          onDateSelect && onDateSelect(formattedDate);
        } else {
          setInputValue(displayDate);
        }
      } else {
        setInputValue(displayDate);
      }
    }
  };

  const handleClear = () => {
    setSelectedDate("");
    setDisplayDate("");
    setInputValue("");
    onDateSelect && onDateSelect(null);
    inputRef.current?.focus();
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
    if (!isDateDisabled(today)) {
      handleDateSelect(today);
    }
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

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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

  // Get input classes based on state
  const getInputClasses = () => {
    const baseClasses = `
      w-full pr-10 rounded-xl transition-all duration-200 font-medium
      focus:outline-none placeholder:font-normal
      ${currentSize.input} ${currentVariant.base}
    `;

    if (disabled) {
      return `${baseClasses} ${currentVariant.disabled} cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} ${currentVariant.error}`;
    }

    if (showCalendar) {
      return `${baseClasses} ${currentVariant.focus}`;
    }

    return `${baseClasses} ${currentVariant.normal}`;
  };

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
          className={`${getInputClasses()} ${currentTheme.input}`}
        />

        {/* Icons Container */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {/* Clear Button */}
          {showClearButton && inputValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={`${currentTheme.clear} transition-colors duration-150 hover:scale-110`}
            >
              <svg
                className={currentSize.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Calendar Icon */}
          <div className={`text-gray-400 ${disabled ? "opacity-50" : ""}`}>
            <svg
              className={currentSize.icon}
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
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className={`
            absolute top-full left-0 z-50 mt-2 rounded-2xl border transition-all duration-300
            ${currentSize.calendar} ${currentTheme.calendar} ${
            currentTheme.calendarGradient
          }
            ${
              isAnimating
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2"
            }
          `}
          style={{
            transformOrigin: "top left",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {/* Calendar Header */}
          <div
            className={`flex items-center justify-between p-4 rounded-t-2xl ${currentTheme.header}`}
          >
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-2 rounded-xl transition-all duration-150 ${currentTheme.headerButton} hover:scale-110`}
            >
              <svg
                className={currentSize.icon}
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

            <h2 className={`font-bold ${currentSize.headerText}`}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>

            <button
              onClick={() => navigateMonth(1)}
              className={`p-2 rounded-xl transition-all duration-150 ${currentTheme.headerButton} hover:scale-110`}
            >
              <svg
                className={currentSize.icon}
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
          <div className="grid grid-cols-7 gap-1 p-4 pb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 px-4 pb-4">
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
                    ${
                      currentSize.dayButton
                    } rounded-xl font-semibold transition-all duration-200
                    transform-gpu relative overflow-hidden
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
                        : "cursor-pointer active:scale-95"
                    }
                    ${
                      !isSelectedDate && !isDisabled && isCurrentMonth
                        ? "hover:scale-110 hover:z-10"
                        : ""
                    }
                  `}
                >
                  {date.getDate()}
                  {isSelectedDate && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          {showTodayButton && (
            <div
              className={`flex justify-between items-center p-4 rounded-b-2xl ${currentTheme.footer}`}
            >
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-150"
              >
                Today
              </button>

              <div className="text-xs text-gray-500 font-medium">
                {format} • {separator}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
