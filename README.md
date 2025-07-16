# React FHK DatePicker

A comprehensive React date and time picker library with multiple components for different use cases. Built with modern React hooks, TypeScript support, and customizable styling with enhanced UI/UX features.

## 🚀 Features

- **Multiple Component Types**: Single date, date range, date-time range, and single date-time pickers
- **Responsive Design**: All components adapt seamlessly from mobile to desktop
- **Global Sorting Order**: Consistent layout (start date → start time → end date → end time)
- **Flexible Format Support**: Simple (YYYY/MM/DD), ISO (ISO 8601), and range formats
- **Smart Validation**: Automatic date and time validation with cross-input restrictions
- **Clean, Minimal UI**: Professional design without cluttered display boxes
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
- **Isolated CSS**: Prefixed class names prevent conflicts with your app's styles
- **Enhanced TimePicker**: 3-column grid layout (Hour, Minute, Second/Period)

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
  TimePicker,
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

Two connected date inputs with smart validation, cross-input restrictions, and responsive design.

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

**Global Sorting Order**: Start Date → End Date

**Responsive Layout**:

- Mobile: 1 column (stacked)
- Desktop: 2 columns (side by side)

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

Date range picker with time inputs supporting seconds (HH:MM:SS) and enhanced responsive design.

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

**Global Sorting Order**: Start Date → Start Time → End Date → End Time

**Responsive Layout**:

- Mobile: 1 column
- Small screens: 2 columns
- Large screens: 4 columns

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
- `timeFormat`: Time format ("12", "24")
- `timeStep`: Time step ("1" for seconds, "60" for minutes only)
- `calendarClassName`: Custom CSS class name for the calendar popup

### 4. DateTimePicker (Single Date-Time)

Single date picker with time input supporting seconds and responsive design.

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

**Global Sorting Order**: Start Date → Start Time

**Responsive Layout**:

- Mobile: 1 column (stacked)
- Desktop: 2 columns (side by side)

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
- `timeFormat`: Time format ("12", "24")
- `timeStep`: Time step ("1" for seconds, "60" for minutes only)
- `calendarClassName`: Custom CSS class name for the calendar popup

### 5. TimePicker (Standalone Time)

Standalone time picker with 3-column grid layout (Hour, Minute, Second/Period).

```jsx
import { TimePicker } from "react-fhk-datepicker";

<TimePicker
  value="15:30:00"
  onChange={(e) => console.log(e.target.value)}
  placeholder="Select time"
  format="24" // "12" or "24"
  step="1" // "1" for seconds, "60" for minutes only
  size="md"
  variant="outline"
  theme="light"
  disabled={false}
  error={false}
  helperText=""
/>;
```

**3-Column Grid Layout**:

- Column 1: Hours (00-23 or 01-12)
- Column 2: Minutes (00-59)
- Column 3: Seconds (00-59) or Period (AM/PM)

**Props:**

- `value`: Current time value (HH:MM:SS format)
- `onChange`: Callback function when time changes
- `placeholder`: Input placeholder text
- `format`: Time format ("12", "24")
- `step`: Time step ("1" for seconds, "60" for minutes only)
- `size`: Component size ("sm", "md", "lg")
- `variant`: Input style variant ("outline", "filled", "ghost")
- `theme`: UI theme ("light", "dark")
- `disabled`: Disable the picker
- `error`: Show error state styling
- `helperText`: Helper text below input

## 🎨 UI Features

### Responsive Design

All components are fully responsive and adapt to different screen sizes:

```jsx
// DateRangePicker - Responsive grid
// Mobile: 1 column, Desktop: 2 columns
<DateRangePicker size="md" />

// DateTimeRangePicker - Responsive grid
// Mobile: 1 column, Small: 2 columns, Large: 4 columns
<DateTimeRangePicker size="md" />

// DateTimePicker - Responsive grid
// Mobile: 1 column, Desktop: 2 columns
<DateTimePicker size="md" />
```

### Global Sorting Order

All components follow a consistent global sorting order for better UX:

- **DateRangePicker**: Start Date → End Date
- **DateTimePicker**: Start Date → Start Time
- **DateTimeRangePicker**: Start Date → Start Time → End Date → End Time

### Clean, Minimal Design

All components feature a clean, professional interface without cluttered display boxes. Selected values are passed through callback functions, keeping the UI minimal and focused.

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

// TimePicker
"15:30:00" // HH:MM:SS format
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

This library uses Tailwind CSS for styling with isolated class names to prevent conflicts with your existing styles.

### Isolated CSS Design

The library uses prefixed class names (`rfhk-`) to ensure no conflicts with your app's existing styles:

- **No style conflicts**: All classes are prefixed with `rfhk-`
- **Lightweight**: Only includes necessary styles
- **Safe integration**: Won't affect your app's existing CSS
- **Professional appearance**: Clean, modern design
- **Responsive grid layouts**: Proper calendar and time picker grids

### Required CSS Import

**You MUST import the CSS file in your app:**

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
- ❌ TimePicker shows as single column
- ❌ Poor user experience

### What Happens With CSS Import

- ✅ Calendar displays as proper 7-column grid
- ✅ Dates are arranged in table-like structure
- ✅ TimePicker shows in 3-column grid (Hour, Minute, Second/Period)
- ✅ Professional appearance and usability

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

### TimePicker Not Showing 3-Column Grid

If your TimePicker displays as a single column instead of the proper 3-column grid:

1. **Ensure CSS import is present:**

   ```jsx
   import "react-fhk-datepicker/style.css";
   ```

2. **Check that the TimePicker component is using the latest version**

3. **Verify no CSS conflicts are overriding the grid styles**

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

### Responsive Layout Examples

```jsx
// DateRangePicker - Responsive grid
<DateRangePicker
  onRangeSelect={handleRangeSelect}
  startPlaceholder="Start date"
  endPlaceholder="End date"
  size="md"
  variant="outline"
/>

// DateTimeRangePicker - Responsive grid with 4 columns on large screens
<DateTimeRangePicker
  onDateTimeRangeSelect={handleDateTimeRangeSelect}
  startDatePlaceholder="Start date"
  endDatePlaceholder="End date"
  startTimePlaceholder="Start time"
  endTimePlaceholder="End time"
  size="md"
  variant="outline"
/>
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

### TimePicker with 3-Column Grid

```jsx
import { TimePicker } from "react-fhk-datepicker";

function TimePickerExample() {
  const [time, setTime] = useState("15:30:00");

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    console.log("Selected time:", e.target.value);
  };

  return (
    <TimePicker
      value={time}
      onChange={handleTimeChange}
      placeholder="Select time"
      format="24"
      step="1"
      size="md"
      variant="outline"
      theme="light"
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

### From v1.0.0 to v1.3.22

- **Responsive Design**: All components now adapt seamlessly from mobile to desktop
- **Global Sorting Order**: Consistent layout across all components
- **Enhanced TimePicker**: Fixed 3-column grid layout (Hour, Minute, Second/Period)
- **Isolated CSS**: All components use prefixed class names to prevent conflicts
- **Removed display boxes**: Clean, minimal UI without cluttered result displays
- **Enhanced validation**: Improved border color feedback (red for invalid, green for valid)
- **Better TypeScript support**: Comprehensive type definitions included
- **Improved accessibility**: Enhanced keyboard navigation and screen reader support
- **Fixed timezone issues**: No more timezone offset problems
- **Enhanced animations**: Smooth transitions and visual feedback
- **Professional design**: Modern, clean interface suitable for production use

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
- Responsive design patterns for optimal mobile and desktop experience
