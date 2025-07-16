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
- **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- **No Dependencies**: Zero external dependencies beyond React
- **Timezone Safe**: No timezone offset issues when selecting dates

## 📦 Installation

```bash
npm install react-fhk-datepicker
```

## 🎯 Quick Start

**✅ IMPORTANT: Import the CSS file for optimal styling (no conflicts with your app's CSS!)**

```jsx
import {
  DatePicker,
  DateRangePicker,
  DateTimeRangePicker,
  DateTimePicker,
} from "react-fhk-datepicker";

// ✅ REQUIRED: Import the isolated CSS file (won't affect your app's styles)
import "react-fhk-datepicker/style.css";

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

### TypeScript Support

The package includes comprehensive TypeScript definitions. No additional `@types` package needed!

```tsx
import { DatePicker, DatePickerProps } from "react-fhk-datepicker";

const MyComponent: React.FC = () => {
  const handleDateSelect: DatePickerProps["onDateSelect"] = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <DatePicker
      onDateSelect={handleDateSelect}
      placeholder="Choose a date"
      format="simple"
      size="md"
      variant="outline"
      calendarClassName="shadow-2xl border-purple-500"
    />
  );
};
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
  calendarClassName="" // Custom className for calendar popup
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
- `calendarClassName`: Custom CSS class name for the calendar popup

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
- `calendarClassName`: Custom CSS class name for the calendar popup

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
- `calendarClassName`: Custom CSS class name for the calendar popup

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
- `calendarClassName`: Custom CSS class name for the calendar popup

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

**⚠️ IMPORTANT: You MUST import the CSS file for the calendar to display correctly!**

This library uses Tailwind CSS for styling. The calendar layout requires specific CSS classes that are included in the provided CSS file.

### Standardized Input Styles

All input fields use consistent, modern styling with:

- **Base styles**: `w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`
- **Focus states**: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- **Dynamic states**: Error (red border/ring), disabled (opacity + gray background), active (blue border/ring)
- **Dark mode support**: All styles include dark mode variants

### Required CSS Import

**You MUST import the CSS file in your app (no conflicts with your existing styles!):**

```js
import { DatePicker, DateRangePicker } from "react-fhk-datepicker";
import "react-fhk-datepicker/style.css"; // ← REQUIRED for proper grid layout
```

**Without this import, the calendar will display as a vertical list instead of a proper grid!**

### Alternative Import Methods

**Option 1: ES6 Import (Recommended)**

```js
import "react-fhk-datepicker/style.css";
```

**Option 2: HTML Link Tag**

```html
<link
  rel="stylesheet"
  href="node_modules/react-fhk-datepicker/dist/style.css"
/>
```

**Option 3: CDN (if available)**

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/react-fhk-datepicker/dist/style.css"
/>
```

### What Happens Without CSS Import

- ❌ Calendar displays as vertical list
- ❌ Dates are not in a grid layout
- ❌ Poor user experience

### What Happens With CSS Import

- ✅ Calendar displays as proper 7-column grid
- ✅ Dates are arranged in table-like structure
- ✅ Professional appearance and usability

**Note:** The CSS file uses isolated class names (prefixed with `rfhk-`) to prevent conflicts with your existing styles, making it lightweight and safe to use in any project.

## 🔧 Troubleshooting

### Calendar Displaying as Vertical List

If your calendar appears as a vertical list instead of a proper 7-column grid:

1. **Make sure you've imported the CSS file:**

   ```jsx
   import "react-fhk-datepicker/style.css";
   ```

2. **Check that the CSS import is not being blocked by your bundler**

3. **Verify the CSS file is being loaded in your browser's developer tools**

4. **If using a custom build setup, ensure the CSS file is included in your build process**

The package includes inline styles as a fallback, but the CSS import is still required for optimal styling.

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

### Custom Calendar Styling

```jsx
<DatePicker
  onDateSelect={handleDateSelect}
  calendarClassName="my-custom-calendar shadow-2xl border-purple-500"
  placeholder="Choose a date"
/>
```

You can add custom CSS classes to style the calendar popup specifically. This is useful for:

- Custom shadows and borders
- Brand-specific styling
- Integration with your app's design system
- Overriding default calendar appearance

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
- Enhanced input validation and security measures
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
