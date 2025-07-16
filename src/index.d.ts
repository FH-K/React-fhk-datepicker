declare module "react-fhk-datepicker" {
  import React from "react";

  // Common prop types
  export interface BaseProps {
    className?: string;
    calendarClassName?: string;
    disabled?: boolean;
    theme?: "light" | "dark";
    size?: "sm" | "md" | "lg";
    variant?: "outline" | "filled" | "ghost";
    showClearButton?: boolean;
    showTodayButton?: boolean;
    autoFocus?: boolean;
    error?: boolean;
    helperText?: string;
  }

  // DatePicker Props
  export interface DatePickerProps extends BaseProps {
    onDateSelect: (date: string | null) => void;
    placeholder?: string;
    format?: "simple" | "iso" | "range";
    separator?: string;
    minDate?: string | null;
    maxDate?: string | null;
    date?: string | null;
  }

  // DateRangePicker Props
  export interface DateRangePickerProps extends BaseProps {
    onRangeSelect: (range: {
      start: string | null;
      end: string | null;
      isValid: boolean;
    }) => void;
    startPlaceholder?: string;
    endPlaceholder?: string;
    format?: "simple" | "iso" | "range";
    separator?: string;
    minDate?: string | null;
    maxDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }

  // TimePicker Props
  export interface TimePickerProps extends BaseProps {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    format?: "12" | "24";
    step?: "1" | "60";
  }

  // DateTimePicker Props
  export interface DateTimePickerProps extends BaseProps {
    onDateTimeSelect: (dateTime: {
      date: string | null;
      time: string | null;
      isValid: boolean;
    }) => void;
    datePlaceholder?: string;
    timePlaceholder?: string;
    format?: "simple" | "iso" | "range";
    separator?: string;
    minDate?: string | null;
    maxDate?: string | null;
    date?: string | null;
    time?: string | null;
    timeFormat?: "12" | "24";
    timeStep?: "1" | "60";
  }

  // DateTimeRangePicker Props
  export interface DateTimeRangePickerProps extends BaseProps {
    onDateTimeRangeSelect: (range: {
      startDate: string | null;
      endDate: string | null;
      startTime: string | null;
      endTime: string | null;
      isValid: boolean;
    }) => void;
    startDatePlaceholder?: string;
    endDatePlaceholder?: string;
    startTimePlaceholder?: string;
    endTimePlaceholder?: string;
    format?: "simple" | "iso" | "range";
    separator?: string;
    minDate?: string | null;
    maxDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    timeFormat?: "12" | "24";
    timeStep?: "1" | "60";
  }

  // Component declarations
  export const DatePicker: React.FC<DatePickerProps>;
  export const DateRangePicker: React.FC<DateRangePickerProps>;
  export const TimePicker: React.FC<TimePickerProps>;
  export const DateTimePicker: React.FC<DateTimePickerProps>;
  export const DateTimeRangePicker: React.FC<DateTimeRangePickerProps>;

  // Default export
  const ReactFHKDatePicker: {
    DatePicker: React.FC<DatePickerProps>;
    DateRangePicker: React.FC<DateRangePickerProps>;
    TimePicker: React.FC<TimePickerProps>;
    DateTimePicker: React.FC<DateTimePickerProps>;
    DateTimeRangePicker: React.FC<DateTimeRangePickerProps>;
  };

  export default ReactFHKDatePicker;
}
