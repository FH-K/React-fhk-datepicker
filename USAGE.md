# React FHK DatePicker - Usage Guide

## Quick Start

### 1. Install the package

```bash
npm install react-fhk-datepicker
```

### 2. Import components AND CSS (REQUIRED)

```jsx
import { DatePicker, DateRangePicker } from "react-fhk-datepicker";
import "react-fhk-datepicker/style.css"; // ← REQUIRED for proper grid layout
```

### 3. Use the components

```jsx
function App() {
  return (
    <div>
      {/* Single Date Picker */}
      <DatePicker
        onDateSelect={(date) => console.log("", date)}
        placeholder="Choose a date"
        format="iso"
        size="md"
        variant="outline"
      />

      {/* Date Range Picker */}
      <DateRangePicker
        onDateRangeSelect={(startDate, endDate) => {
          console.log("Start:", startDate);
          console.log("End:", endDate);
        }}
        startPlaceholder="Start date"
        endPlaceholder="End date"
        format="iso"
        size="md"
        variant="outline"
        showClearButton={true}
        showTodayButton={true}
      />
    </div>
  );
}
```

## ⚠️ Important Notes

### CSS Import is MANDATORY

Without importing the CSS file, the calendar will display as a **vertical list** instead of a proper **grid layout**.

**❌ Wrong (Calendar will be broken):**

```jsx
import { DatePicker } from "react-fhk-datepicker";
// Missing CSS import - calendar will be vertical list
```

**✅ Correct (Calendar will work properly):**

```jsx
import { DatePicker } from "react-fhk-datepicker";
import "react-fhk-datepicker/style.css"; // Required for grid layout
```

### Alternative CSS Import Methods

**Method 1: ES6 Import (Recommended)**

```jsx
import "react-fhk-datepicker/style.css";
```

**Method 2: HTML Link Tag**

```html
<link
  rel="stylesheet"
  href="node_modules/react-fhk-datepicker/dist/style.css"
/>
```

**Method 3: In your main CSS file**

```css
@import "react-fhk-datepicker/style.css";
```

## Complete Example

```jsx
import React, { useState } from "react";
import { DatePicker, DateRangePicker } from "react-fhk-datepicker";
import "react-fhk-datepicker/style.css"; // ← REQUIRED

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Date Picker Examples</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Single Date Picker</h3>
        <DatePicker
          onDateSelect={setSelectedDate}
          placeholder="Choose a date"
          format="iso"
          size="md"
          variant="outline"
          showClearButton={true}
          showTodayButton={true}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Date Range Picker</h3>
        <DateRangePicker
          onDateRangeSelect={(start, end) => setDateRange({ start, end })}
          startPlaceholder="Start date"
          endPlaceholder="End date"
          format="iso"
          size="md"
          variant="outline"
          showClearButton={true}
          showTodayButton={true}
        />
        {dateRange.start && dateRange.end && (
          <p>
            Range: {dateRange.start} to {dateRange.end}
          </p>
        )}
      </div>
    </div>
  );
}

export default MyComponent;
```

## Troubleshooting

### Calendar displays as vertical list?

- **Solution**: Make sure you've imported the CSS file
- **Check**: Look for `import 'react-fhk-datepicker/style.css';` in your code

### CSS not loading?

- **Solution**: Check the path to the CSS file
- **Alternative**: Try the HTML link tag method

### Still having issues?

- **Check**: Your bundler configuration
- **Verify**: The CSS file exists in `node_modules/react-fhk-datepicker/dist/style.css`
