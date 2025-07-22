import React, { useState, useRef, useEffect } from "react";

const TimePicker = ({
  value = "",
  onChange,
  placeholder = "Select time",
  disabled = false,
  theme = "light",
  size = "md",
  variant = "outline",
  format = "24", // "12" or "24"
  step = "1", // "1" for seconds, "60" for minutes only
  className = "",
  error = false,
  helperText = "",
  bgColorLight,
  bgColorDark,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [inputValue, setInputValue] = useState("");

  const timePickerRef = useRef(null);
  const inputRef = useRef(null);

  // Size configurations
  const sizes = {
    sm: {
      input: "px-3 py-2 text-sm",
      dropdown: "w-64",
      icon: "w-4 h-4",
      scrollHeight: "h-32",
    },
    md: {
      input: "px-4 py-3 text-base",
      dropdown: "w-72",
      icon: "w-5 h-5",
      scrollHeight: "h-36",
    },
    lg: {
      input: "px-5 py-4 text-lg",
      dropdown: "w-80",
      icon: "w-6 h-6",
      scrollHeight: "h-40",
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

  // Theme configurations
  const themes = {
    light: {
      dropdown: "bg-white border-gray-200 shadow-xl",
      header: "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800",
      scrollArea: "bg-gray-50",
      item: "hover:bg-blue-50 text-gray-700 hover:text-blue-600",
      selectedItem: "bg-blue-500 text-white",
      input: "text-gray-900 placeholder-gray-500",
      clear: "text-gray-400 hover:text-red-500",
    },
    dark: {
      dropdown: "bg-gray-900 border-gray-700 shadow-xl shadow-black/20",
      header: "bg-gradient-to-r from-gray-800 to-gray-700 text-white",
      scrollArea: "bg-gray-800",
      item: "hover:bg-gray-700 text-gray-300 hover:text-blue-400",
      selectedItem: "bg-blue-600 text-white",
      input: "text-white placeholder-gray-400",
      clear: "text-gray-500 hover:text-red-400",
    },
  };

  const currentTheme = themes[theme];

  // Generate time options
  const generateHours = () => {
    const hours = [];
    const maxHour = format === "12" ? 12 : 23;
    const startHour = format === "12" ? 1 : 0;

    for (let i = startHour; i <= maxHour; i++) {
      hours.push(String(i).padStart(2, "0"));
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(String(i).padStart(2, "0"));
    }
    return minutes;
  };

  const generateSeconds = () => {
    const seconds = [];
    for (let i = 0; i < 60; i++) {
      seconds.push(String(i).padStart(2, "0"));
    }
    return seconds;
  };

  // Parse time value
  useEffect(() => {
    if (value) {
      const [hours, minutes, seconds] = value.split(":");

      if (format === "12") {
        const hour24 = parseInt(hours);
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
        const period = hour24 >= 12 ? "PM" : "AM";

        setSelectedHour(String(hour12).padStart(2, "0"));
        setSelectedPeriod(period);
      } else {
        setSelectedHour(hours);
      }

      setSelectedMinute(minutes || "00");
      setSelectedSecond(seconds || "00");

      // Format display value
      const displayValue =
        format === "12"
          ? `${String(selectedHour).padStart(2, "0")}:${minutes || "00"}${
              step === "1" ? `:${seconds || "00"}` : ""
            } ${selectedPeriod}`
          : `${hours}:${minutes || "00"}${
              step === "1" ? `:${seconds || "00"}` : ""
            }`;

      setInputValue(displayValue);
    } else {
      setInputValue("");
      setSelectedHour("");
      setSelectedMinute("");
      setSelectedSecond("");
      setSelectedPeriod("AM");
    }
  }, [value, format, step]);

  // Handle time selection
  const handleTimeSelect = (type, val) => {
    let newHour = selectedHour;
    let newMinute = selectedMinute;
    let newSecond = selectedSecond;
    let newPeriod = selectedPeriod;

    switch (type) {
      case "hour":
        newHour = val;
        setSelectedHour(val);
        break;
      case "minute":
        newMinute = val;
        setSelectedMinute(val);
        break;
      case "second":
        newSecond = val;
        setSelectedSecond(val);
        break;
      case "period":
        newPeriod = val;
        setSelectedPeriod(val);
        break;
    }

    // Convert to 24-hour format for output
    let outputHour = newHour;
    if (format === "12" && newHour) {
      const hour12 = parseInt(newHour);
      if (newPeriod === "PM" && hour12 !== 12) {
        outputHour = String(hour12 + 12).padStart(2, "0");
      } else if (newPeriod === "AM" && hour12 === 12) {
        outputHour = "00";
      }
    }

    // Build time string
    if (newHour && newMinute) {
      const timeString =
        step === "1"
          ? `${outputHour}:${newMinute}:${newSecond || "00"}`
          : `${outputHour}:${newMinute}:00`;

      onChange && onChange({ target: { value: timeString } });

      // Update display
      const displayValue =
        format === "12"
          ? `${newHour}:${newMinute}${
              step === "1" ? `:${newSecond || "00"}` : ""
            } ${newPeriod}`
          : `${outputHour}:${newMinute}${
              step === "1" ? `:${newSecond || "00"}` : ""
            }`;

      setInputValue(displayValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedHour("");
    setSelectedMinute("");
    setSelectedSecond("");
    setSelectedPeriod("AM");
    onChange && onChange({ target: { value: "" } });
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get input classes based on state
  const getInputClasses = () => {
    const baseClasses = `
      w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
      rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
      placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
      focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200
    `;

    if (disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700`;
    }

    if (error) {
      return `${baseClasses} border-red-500 focus:ring-red-500`;
    }

    if (isOpen) {
      return `${baseClasses} border-blue-500 focus:ring-blue-500`;
    }

    return baseClasses;
  };

  // Scrollable list component
  const ScrollableList = ({ items, selected, onSelect, type }) => (
    <div className={`overflow-y-auto ${currentSize.scrollHeight}`}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(type, item)}
          className={`
            w-full px-3 py-2 text-sm text-left transition-all duration-150
            ${selected === item ? currentTheme.selectedItem : currentTheme.item}
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );

  // Sanitize className to prevent CSS injection
  const sanitizeClassName = (className) => {
    if (!className) return "";
    // Remove any potentially dangerous characters
    return className.replace(/[<>"'&]/g, "").trim();
  };

  const sanitizedClassName = sanitizeClassName(className);

  return (
    <div
      className={`rfhk-timepicker-container rfhk-theme-${theme} rfhk-size-${size} rfhk-variant-${variant} ${
        error ? "rfhk-error" : ""
      } ${disabled ? "rfhk-disabled" : ""} ${sanitizedClassName}`}
      style={{
        background:
          theme === "dark" ? bgColorDark || "#1f2937" : bgColorLight || "#fff",
      }}
    >
      {/* Input Field */}
      <div className="rfhk-timepicker-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="rfhk-timepicker-input"
        />

        {/* Icons Container */}
        <div className="rfhk-timepicker-input-icons">
          {/* Clear Button */}
          {inputValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="rfhk-timepicker-clear-button"
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

          {/* Clock Icon */}
          <div className="rfhk-timepicker-clock-icon">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={`rfhk-timepicker-helper-text ${error ? "rfhk-error" : ""}`}
        >
          {helperText}
        </p>
      )}

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div ref={timePickerRef} className="rfhk-timepicker-dropdown">
          {/* Header */}
          <div className="rfhk-timepicker-header">
            <h3 className="rfhk-timepicker-title">Select Time</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rfhk-timepicker-close"
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
          </div>

          {/* Time Selection Grid */}
          <div className="rfhk-timepicker-grid">
            {/* Hours */}
            <div className="rfhk-timepicker-column">
              <div className="rfhk-timepicker-label">Hour</div>
              <div className="rfhk-timepicker-scroll-area">
                {generateHours().map((item) => (
                  <button
                    key={item}
                    onClick={() => handleTimeSelect("hour", item)}
                    className={`rfhk-timepicker-item ${
                      selectedHour === item ? "rfhk-selected" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="rfhk-timepicker-column">
              <div className="rfhk-timepicker-label">Minute</div>
              <div className="rfhk-timepicker-scroll-area">
                {generateMinutes().map((item) => (
                  <button
                    key={item}
                    onClick={() => handleTimeSelect("minute", item)}
                    className={`rfhk-timepicker-item ${
                      selectedMinute === item ? "rfhk-selected" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Seconds or Period */}
            <div className="rfhk-timepicker-column">
              <div className="rfhk-timepicker-label">
                {step === "1" ? "Second" : "Period"}
              </div>
              <div className="rfhk-timepicker-scroll-area">
                {step === "1"
                  ? generateSeconds().map((item) => (
                      <button
                        key={item}
                        onClick={() => handleTimeSelect("second", item)}
                        className={`rfhk-timepicker-item ${
                          selectedSecond === item ? "rfhk-selected" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))
                  : ["AM", "PM"].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleTimeSelect("period", item)}
                        className={`rfhk-timepicker-item ${
                          selectedPeriod === item ? "rfhk-selected" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
