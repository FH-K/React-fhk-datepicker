# React FHK DatePicker

A comprehensive React date and time picker library with multiple components for different use cases. Built with modern React hooks, TypeScript support, and customizable styling with enhanced UI/UX features.

## 🚀 Features

- **Multiple Component Types**: Single date, date range, date-time range, and single date-time pickers
- **Flexible Format Support**: Simple (YYYY/MM/DD), ISO (ISO 8601), and range formats
- **Smart Validation**: Automatic date and time validation with cross-input restrictions
- **Enhanced UI/UX**: Modern design with animations, gradients, and improved interactions
- **Multiple Sizes**: Small, medium, and large size variants
- **Multiple Variants**: Outline, filled, and ghost input styles
- **Customizable Controls**: Clear button, today button, and auto-focus options
- **Error Handling**: Built-in error states with helper text support
- **Customizable UI**: Light and dark themes with Tailwind CSS styling
- **Accessibility**: Keyboard navigation and screen reader support
- **TypeScript Ready**: Full TypeScript support with proper type definitions
- **No Dependencies**: Zero external dependencies beyond React
- **Timezone Safe**: No timezone offset issues when selecting dates

## 📦 Installation

```bash
npm install react-fhk-datepicker
```

## 🎯 Quick Start

```jsx
import {
  DatePicker,
  DateRangePicker,
  DateTimeRangePicker,
  DateTimePicker,
} from "react-fhk-datepicker";

function App() {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <DatePicker
      onDateSelect={handleDateSelect}
      placeholder="Choose a date"
      format="simple"
      size="md"
      variant="outline"
    />
  );
}
```

## 📋 Components

### 1. DatePicker (Single Date)

A single date picker with calendar dropdown, multiple format options, and enhanced UI features.

```jsx
import { DatePicker } from "react-fhk-datepicker";

<DatePicker
  onDateSelect={(date) => console.log(date)}
  placeholder="Select date"
  format="simple" // "simple", "iso", "range"
  separator="/" // "/", "-", or custom
  minDate="2024-01-01"
  maxDate="2025-12-31"
  theme="light" // "light", "dark"
  size="md" // "sm", "md", "lg"
  variant="outline" // "outline", "filled", "ghost"
  showClearButton={true}
  showTodayButton={true}
  autoFocus={false}
  error={false}
  helperText=""
  disabled={false}
/>;
```

**Props:**

- `onDateSelect`: Callback function when date is selected
- `placeholder`: Input placeholder text
- `format`: Date format ("simple", "iso", "range")
- `separator`: Date separator character
- `minDate`: Minimum selectable date
- `maxDate`: Maximum selectable date
- `theme`: UI theme ("light", "dark")
- `size`: Component size ("sm", "md", "lg")
- `variant`: Input style variant ("outline", "filled", "ghost")
- `showClearButton`: Show clear button when input has value
- `showTodayButton`: Show today button in calendar footer
- `autoFocus`: Auto-focus the input on mount
- `error`: Show error state styling
- `helperText`: Helper text below input
- `disabled`: Disable the picker

### 2. DateRangePicker (Date Range)

Two connected date inputs with smart validation, cross-input restrictions, and enhanced UI.

```jsx
import { DateRangePicker } from "react-fhk-datepicker";

<DateRangePicker
  onRangeSelect={(range) => console.log(range)}
  startPlaceholder="Start date"
  endPlaceholder="End date"
  format="iso"
  size="md"
  variant="outline"
  showClearButton={true}
  showTodayButton={true}
  minDate="2024-01-01"
  maxDate="2025-12-31"
  theme="light"
/>;
```

**Props:**

- `onRangeSelect`: Callback function when range is selected
- `startPlaceholder`: Start date placeholder
- `endPlaceholder`: End date placeholder
- `format`: Date format ("simple", "iso", "range")
- `separator`: Date separator character
- `size`: Component size ("sm", "md", "lg")
- `variant`: Input style variant ("outline", "filled", "ghost")
- `showClearButton`: Show clear button when input has value
- `showTodayButton`: Show today button in calendar footer
- `autoFocus`: Auto-focus the first input on mount
- `error`: Show error state styling
- `helperText`: Helper text below inputs
- `minDate`: Minimum selectable date
- `maxDate`: Maximum selectable date
- `theme`: UI theme ("light", "dark")
- `disabled`: Disable the picker
- `startDate`: Initial start date
- `endDate`: Initial end date

### 3. DateTimeRangePicker (Date-Time Range)

Date range picker with time inputs supporting seconds (HH:MM:SS) and enhanced UI.

```jsx
import { DateTimeRangePicker } from "react-fhk-datepicker";

<DateTimeRangePicker
  onDateTimeRangeSelect={(range) => console.log(range)}
  startDatePlaceholder="Start date"
  endDatePlaceholder="End date"
  startTimePlaceholder="Start time"
  endTimePlaceholder="End time"
  format="iso"
  size="md"
  variant="outline"
  showClearButton={true}
  showTodayButton={true}
/>;
```

**Props:**

- `onDateTimeRangeSelect`: Callback function when date-time range is selected
- `startDatePlaceholder`: Start date placeholder
- `endDatePlaceholder`: End date placeholder
- `startTimePlaceholder`: Start time placeholder
- `endTimePlaceholder`: End time placeholder
- `format`: Date format ("simple", "iso", "range")
- `separator`: Date separator character
- `size`: Component size ("sm", "md", "lg")
- `variant`: Input style variant ("outline", "filled", "ghost")
- `showClearButton`: Show clear button when input has value
- `showTodayButton`: Show today button in calendar footer
- `autoFocus`: Auto-focus the first input on mount
- `error`: Show error state styling
- `helperText`: Helper text below inputs
- `minDate`: Minimum selectable date
- `maxDate`: Maximum selectable date
- `theme`: UI theme ("light", "dark")
- `disabled`: Disable the picker
- `startDate`: Initial start date
- `endDate`: Initial end date
- `startTime`: Initial start time
- `endTime`: Initial end time

### 4. DateTimePicker (Single Date-Time)

Single date picker with time input supporting seconds and enhanced UI.

```jsx
import { DateTimePicker } from "react-fhk-datepicker";

<DateTimePicker
  onDateTimeSelect={(dateTime) => console.log(dateTime)}
  datePlaceholder="Select date"
  timePlaceholder="Select time"
  format="iso"
  size="md"
  variant="outline"
  showClearButton={true}
  showTodayButton={true}
/>;
```

**Props:**

- `onDateTimeSelect`: Callback function when date-time is selected
- `datePlaceholder`: Date input placeholder
- `timePlaceholder`: Time input placeholder
- `format`: Date format ("simple", "iso", "range")
- `separator`: Date separator character
- `size`: Component size ("sm", "md", "lg")
- `variant`: Input style variant ("outline", "filled", "ghost")
- `showClearButton`: Show clear button when input has value
- `showTodayButton`: Show today button in calendar footer
- `autoFocus`: Auto-focus the date input on mount
- `error`: Show error state styling
- `helperText`: Helper text below inputs
- `minDate`: Minimum selectable date
- `maxDate`: Maximum selectable date
- `theme`: UI theme ("light", "dark")
- `disabled`: Disable the picker
- `date`: Initial date
- `time`: Initial time

## 🎨 UI Features

### Size Variants

```jsx
// Small size
<DatePicker size="sm" />

// Medium size (default)
<DatePicker size="md" />

// Large size
<DatePicker size="lg" />
```

### Style Variants

```jsx
// Outline style (default)
<DatePicker variant="outline" />

// Filled style
<DatePicker variant="filled" />

// Ghost style
<DatePicker variant="ghost" />
```

### Enhanced Controls

```jsx
<DatePicker
  showClearButton={true} // Show clear button
  showTodayButton={true} // Show today button
  autoFocus={true} // Auto-focus on mount
  error={false} // Error state
  helperText="Select a date" // Helper text
/>
```

### Theme Support

```jsx
// Light theme (default)
<DatePicker theme="light" />

// Dark theme
<DatePicker theme="dark" />
```

## 📊 Data Formats

### Simple Format

```javascript
// DatePicker
"2025/06/30"

// DateRangePicker
{
  start: "2025/06/30",
  end: "2025/07/01",
  isValid: true
}

// DateTimeRangePicker
{
  startDate: "2025/06/30",
  endDate: "2025/07/01",
  startTime: "15:30:00",
  endTime: "16:45:00",
  isValid: true
}

// DateTimePicker
{
  date: "2025/06/30",
  time: "15:30:00",
  isValid: true
}
```

### ISO Format

```javascript
// DatePicker
"2025-06-30T00:00:00.000Z"

// DateRangePicker
{
  start: "2025-06-30T00:00:00.000Z",
  end: "2025-07-01T23:59:59.999Z",
  isValid: true
}

// DateTimeRangePicker
{
  startDate: "2025-06-30T15:30:00.000Z",
  endDate: "2025-07-01T16:45:00.999Z",
  startTime: "15:30:00",
  endTime: "16:45:00",
  isValid: true
}

// DateTimePicker
{
  date: "2025-06-30T15:30:00.000Z",
  time: "15:30:00",
  isValid: true
}
```

### Range Format

```javascript
// DatePicker
{
  start: "2025-06-30T00:00:00.000Z",
  end: "2025-06-30T23:59:59.999Z"
}
```

## 🎨 Styling

The components use Tailwind CSS classes and support both light and dark themes with enhanced UI features:

- **Modern Design**: Rounded corners, gradients, and smooth animations
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper focus states and keyboard navigation
- **Customizable**: Easy to override with custom CSS classes

### Dark Theme Example

```jsx
<DatePicker
  theme="dark"
  size="lg"
  variant="filled"
  onDateSelect={handleDateSelect}
  placeholder="Choose a date"
/>
```

## 🔧 Advanced Usage

### Custom Date Restrictions

```jsx
<DateRangePicker
  minDate="2024-01-01"
  maxDate="2025-12-31"
  onRangeSelect={handleRangeSelect}
  size="md"
  variant="outline"
/>
```

### Error State with Helper Text

```jsx
<DatePicker
  error={true}
  helperText="Please select a valid date"
  onDateSelect={handleDateSelect}
/>
```

### Custom Separators

```jsx
<DatePicker separator="-" format="simple" onDateSelect={handleDateSelect} />
// Output: "2025-06-30"
```

### Controlled Components

```jsx
const [selectedDate, setSelectedDate] = useState("");

<DatePicker
  onDateSelect={setSelectedDate}
  date={selectedDate}
  format="iso"
  size="lg"
  variant="filled"
/>;
```

## 🧪 Examples

### Basic Date Selection

```jsx
import { DatePicker } from "react-fhk-datepicker";

function BasicExample() {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <DatePicker
      onDateSelect={handleDateSelect}
      placeholder="Choose a date"
      format="simple"
      size="md"
      variant="outline"
    />
  );
}
```

### Date Range with Validation

```jsx
import { DateRangePicker } from "react-fhk-datepicker";

function RangeExample() {
  const handleRangeSelect = (range) => {
    if (range.isValid) {
      console.log("Valid range:", range);
    } else {
      console.log("Invalid range");
    }
  };

  return (
    <DateRangePicker
      onRangeSelect={handleRangeSelect}
      startPlaceholder="Start date"
      endPlaceholder="End date"
      format="iso"
      size="lg"
      variant="filled"
      minDate="2024-01-01"
      maxDate="2025-12-31"
    />
  );
}
```

### Date-Time Range with Enhanced UI

```jsx
import { DateTimeRangePicker } from "react-fhk-datepicker";

function DateTimeRangeExample() {
  const handleDateTimeRangeSelect = (range) => {
    console.log("Date-time range:", range);
  };

  return (
    <DateTimeRangePicker
      onDateTimeRangeSelect={handleDateTimeRangeSelect}
      startDatePlaceholder="Start date"
      endDatePlaceholder="End date"
      startTimePlaceholder="Start time"
      endTimePlaceholder="End time"
      format="iso"
      size="md"
      variant="outline"
      showClearButton={true}
      showTodayButton={true}
    />
  );
}
```

### Error State Example

```jsx
import { DatePicker } from "react-fhk-datepicker";

function ErrorExample() {
  const [hasError, setHasError] = useState(false);

  return (
    <DatePicker
      onDateSelect={(date) => {
        if (!date) {
          setHasError(true);
        } else {
          setHasError(false);
        }
      }}
      error={hasError}
      helperText={hasError ? "Please select a date" : ""}
      placeholder="Select a date"
    />
  );
}
```

## 🚀 Migration Guide

### From v1.0.0 to v1.2.0

- Added enhanced UI features with size and variant props
- Added clear button and today button controls
- Added error state and helper text support
- Added auto-focus functionality
- Fixed timezone issues with date selection
- Fixed dark mode input text visibility issues
- Enhanced animations and visual feedback
- Improved accessibility and keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern JavaScript
- Styled with Tailwind CSS
- Icons from Heroicons
- Calendar logic inspired by modern date picker patterns
- Enhanced UI/UX with modern design principles
