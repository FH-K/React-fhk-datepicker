import React, { useState } from "react";

// Enhanced DatePicker Component (same as above)
const DatePicker = ({
  onDateSelect,
  placeholder = "Select date",
  format = "simple",
  separator = "/",
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  theme = "light",
  size = "md",
  variant = "outline",
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

  const calendarRef = React.useRef(null);
  const inputRef = React.useRef(null);

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
      base: "border-2 bg-white",
      normal: "border-gray-300 hover:border-gray-400",
      focus: "border-blue-500 ring-4 ring-blue-100",
      error: "border-red-500 ring-4 ring-red-100",
      disabled: "border-gray-200 bg-gray-50",
    },
    filled: {
      base: "border-0 bg-gray-100",
      normal: "hover:bg-gray-200",
      focus: "bg-white ring-4 ring-blue-100 shadow-md",
      error: "bg-red-50 ring-4 ring-red-100",
      disabled: "bg-gray-100 opacity-60",
    },
    ghost: {
      base: "border-0 bg-transparent",
      normal: "hover:bg-gray-100",
      focus: "bg-white ring-4 ring-blue-100 shadow-lg",
      error: "bg-red-50 ring-4 ring-red-100",
      disabled: "bg-gray-50 opacity-60",
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

  // Format date for display
  const formatForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}${separator}${day}${separator}${year}`;
  };

  // Format date based on format type
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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    setIsAnimating(true);

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
    if (calendarRef.current && calendarRef.current.contains(e.relatedTarget)) {
      return;
    }

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

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (selectedDate) {
      const displayFormat = formatForDisplay(selectedDate);
      setDisplayDate(displayFormat);
      setInputValue(displayFormat);
    }
  }, [separator, selectedDate]);

  React.useEffect(() => {
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

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}

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

// Demo Component
export default function EnhancedDatePickerDemo() {
  const [selectedDates, setSelectedDates] = useState({});
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleDateSelect = (key) => (date) => {
    setSelectedDates((prev) => ({ ...prev, [key]: date }));
  };

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-500 ${
        currentTheme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1
              className={`text-4xl font-bold ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              🎨 Enhanced DatePicker
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-200 ${
                currentTheme === "dark"
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {currentTheme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
          <p
            className={`text-lg ${
              currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Professional-grade date picker with modern UI and advanced features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Sizes */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              📏 Multiple Sizes
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Small
                </label>
                <DatePicker
                  size="sm"
                  theme={currentTheme}
                  placeholder="Small size"
                  onDateSelect={handleDateSelect("small")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Medium (Default)
                </label>
                <DatePicker
                  size="md"
                  theme={currentTheme}
                  placeholder="Medium size"
                  onDateSelect={handleDateSelect("medium")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Large
                </label>
                <DatePicker
                  size="lg"
                  theme={currentTheme}
                  placeholder="Large size"
                  onDateSelect={handleDateSelect("large")}
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              🎨 Style Variants
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Outline (Default)
                </label>
                <DatePicker
                  variant="outline"
                  theme={currentTheme}
                  placeholder="Outline variant"
                  onDateSelect={handleDateSelect("outline")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Filled
                </label>
                <DatePicker
                  variant="filled"
                  theme={currentTheme}
                  placeholder="Filled variant"
                  onDateSelect={handleDateSelect("filled")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Ghost
                </label>
                <DatePicker
                  variant="ghost"
                  theme={currentTheme}
                  placeholder="Ghost variant"
                  onDateSelect={handleDateSelect("ghost")}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ⚡ Advanced Features
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  With Helper Text
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="Select your birthday"
                  helperText="Choose any date from the past"
                  maxDate={new Date().toISOString().split("T")[0]}
                  onDateSelect={handleDateSelect("helper")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Error State
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="Invalid date"
                  error={true}
                  helperText="Please select a valid date"
                  onDateSelect={handleDateSelect("error")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Disabled
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="Disabled picker"
                  disabled={true}
                  onDateSelect={handleDateSelect("disabled")}
                />
              </div>
            </div>
          </div>

          {/* Date Restrictions */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              🔒 Date Restrictions
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Future Dates Only
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="Select future date"
                  minDate={new Date().toISOString().split("T")[0]}
                  helperText="Only future dates allowed"
                  onDateSelect={handleDateSelect("future")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  This Year Only
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="2025 dates only"
                  minDate="2025-01-01"
                  maxDate="2025-12-31"
                  helperText="Restricted to 2025"
                  onDateSelect={handleDateSelect("thisYear")}
                />
              </div>
            </div>
          </div>

          {/* Formats */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Date Formats
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Simple Format
                </label>
                <DatePicker
                  theme={currentTheme}
                  format="simple"
                  separator="/"
                  placeholder="MM/DD/YYYY"
                  onDateSelect={handleDateSelect("simple")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  ISO Format
                </label>
                <DatePicker
                  theme={currentTheme}
                  format="iso"
                  placeholder="ISO 8601"
                  onDateSelect={handleDateSelect("iso")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Custom Separator
                </label>
                <DatePicker
                  theme={currentTheme}
                  format="simple"
                  separator="-"
                  placeholder="MM-DD-YYYY"
                  onDateSelect={handleDateSelect("custom")}
                />
              </div>
            </div>
          </div>

          {/* Custom Options */}
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              🎛️ Custom Options
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  No Clear Button
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="No clear button"
                  showClearButton={false}
                  onDateSelect={handleDateSelect("noClear")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  No Today Button
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="No today button"
                  showTodayButton={false}
                  onDateSelect={handleDateSelect("noToday")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Auto Focus
                </label>
                <DatePicker
                  theme={currentTheme}
                  placeholder="Auto focused"
                  autoFocus={true}
                  onDateSelect={handleDateSelect("autoFocus")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Values Display */}
        {Object.keys(selectedDates).length > 0 && (
          <div
            className={`p-6 rounded-2xl border-2 ${
              currentTheme === "dark"
                ? "bg-green-900/30 border-green-700"
                : "bg-green-50 border-green-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                currentTheme === "dark" ? "text-green-300" : "text-green-800"
              }`}
            >
              ✅ Selected Values
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(selectedDates).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className={`p-3 rounded-lg ${
                        currentTheme === "dark"
                          ? "bg-green-800/50"
                          : "bg-green-100"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium ${
                          currentTheme === "dark"
                            ? "text-green-300"
                            : "text-green-700"
                        }`}
                      >
                        {key}:
                      </div>
                      <div
                        className={`text-xs font-mono ${
                          currentTheme === "dark"
                            ? "text-green-200"
                            : "text-green-800"
                        }`}
                      >
                        {typeof value === "string"
                          ? value
                          : JSON.stringify(value, null, 2)}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
