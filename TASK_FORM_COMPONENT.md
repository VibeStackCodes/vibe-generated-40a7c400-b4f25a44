# Task Input Form Component

## Overview

The `TaskInputForm` component is a reusable React component that provides a user-friendly form for creating new tasks with the following fields:

- **Task Title**: Required text input (3-100 characters)
- **Due Date**: Optional date picker (cannot select past dates)
- **Priority**: Required dropdown selector with three levels (Low, Medium, High)

## File Location

- **Component**: `src/components/task-input-form.tsx`
- **Demo Page**: `src/pages/task-form-demo.tsx`

## Features

### Form Fields

1. **Task Title**
   - Required field (indicated by red asterisk)
   - Text input with max length of 100 characters
   - Real-time character count display (e.g., "42/100")
   - Minimum 3 characters required
   - Placeholder: "Enter task title..."

2. **Due Date**
   - Optional field
   - HTML5 date picker
   - Prevents selection of past dates
   - Defaults to today's date as minimum

3. **Priority Selector**
   - Three priority levels with color-coded badges:
     - **Low**: Green badge
     - **Medium**: Yellow badge (default)
     - **High**: Red badge
   - Visual badge preview that updates in real-time
   - Dropdown select element

### Additional Features

- **Error Handling**: Displays validation errors in a red alert box
- **Loading State**: Disables all form fields and buttons during submission
- **Form Reset**: Clear button to reset all fields to default values
- **Dark Mode Support**: Full dark mode styling using Tailwind CSS classes
- **Responsive Design**: Mobile-friendly with Tailwind CSS

## Component Props

```typescript
interface TaskInputFormProps {
  onSubmit: (data: TaskFormData) => void | Promise<void>
  isLoading?: boolean
}

interface TaskFormData {
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}
```

### Props Description

- **onSubmit**: Callback function that receives form data when the form is submitted
  - Can be async
  - Form resets on successful submission
  - Errors from async operations are displayed to user

- **isLoading** (optional): Boolean to disable form during submission (default: false)

## Usage Example

```typescript
import { TaskInputForm } from '@/components/task-input-form'
import { useState } from 'react'

export function MyComponent() {
  const [tasks, setTasks] = useState([])

  const handleTaskSubmit = async (data) => {
    // Send to API
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to create task')
    }

    // Update local state
    const newTask = await response.json()
    setTasks(prev => [newTask, ...prev])
  }

  return (
    <div>
      <TaskInputForm onSubmit={handleTaskSubmit} />
      {/* Display tasks */}
    </div>
  )
}
```

## Validation Rules

1. **Title**
   - Required: Cannot be empty or whitespace-only
   - Minimum length: 3 characters
   - Maximum length: 100 characters

2. **Due Date**
   - Optional
   - Cannot be in the past
   - Format: ISO date string (YYYY-MM-DD)

3. **Priority**
   - Must be one of: 'low', 'medium', 'high'
   - Defaults to 'medium'

## Styling

The component uses Tailwind CSS for all styling:

- Form container: Rounded border with shadow, light background
- Input fields: Standard form styling with dark mode support
- Buttons: Primary blue button for submit, neutral for reset
- Labels: Medium weight, accessible with proper `htmlFor` attributes
- Error messages: Red background with dark mode variant
- Priority badges: Color-coded for visual distinction

### Color Scheme

- **Low Priority**: `bg-green-100 text-green-800` (dark: `bg-green-900 text-green-200`)
- **Medium Priority**: `bg-yellow-100 text-yellow-800` (dark: `bg-yellow-900 text-yellow-200`)
- **High Priority**: `bg-red-100 text-red-800` (dark: `bg-red-900 text-red-200`)

## Accessibility Features

- Proper label-input associations using `htmlFor` attributes
- Required field indicators with asterisks
- Error messages in accessible alert box
- Semantic HTML form elements
- Disabled state for form controls during loading
- Character count helper text

## Demo Page

A complete demo page is available at `src/pages/task-form-demo.tsx` that showcases:

- Form in action
- Task list that displays submitted tasks
- Real-time updates
- Simulated API delay
- Empty state messaging

## Integration with FocusFlow Todo

This component is designed for the FocusFlow Todo application and follows:

- Project's TypeScript strict mode
- Tailwind CSS utility-first styling
- React 19.2.0 with Hooks
- FocusFlow brand guidelines (colors, fonts)

## Browser Support

- Modern browsers supporting HTML5 date input
- Fallback to text input on older browsers (graceful degradation)
- Dark mode support via CSS media queries

## Future Enhancements

Potential improvements for future versions:

1. Add task category/project selector
2. Add recurring task options
3. Add time picker for due time
4. Add task description/notes field
5. Add attachment support
6. Add task templates
7. Add collaborative features (assignees)
8. Integration with calendar component
