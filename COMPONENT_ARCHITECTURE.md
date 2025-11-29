# TaskInputForm Component Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      TaskInputForm                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                  Form Container                      │ │
│  │  (rounded border, shadow, light/dark background)     │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  "Create New Task" Heading                      │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  Error Alert (conditional)                      │ │ │
│  │  │  └─ Error message text                          │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  Form Fields Container (space-y-4)             │ │ │
│  │  │                                                 │ │ │
│  │  │  ┌───────────────────────────────────────────┐ │ │
│  │  │  │  Task Title Section                       │ │ │
│  │  │  │  ├─ Label: "Task Title *"                │ │ │
│  │  │  │  ├─ Input: Text field (3-100 chars)      │ │ │
│  │  │  │  └─ Counter: Current/Max (e.g., 0/100)   │ │ │
│  │  │  └───────────────────────────────────────────┘ │ │
│  │  │                                                 │ │
│  │  │  ┌───────────────────────────────────────────┐ │ │
│  │  │  │  Due Date Section                         │ │ │
│  │  │  │  ├─ Label: "Due Date (Optional)"         │ │ │
│  │  │  │  └─ Input: Date picker (no past dates)   │ │ │
│  │  │  └───────────────────────────────────────────┘ │ │
│  │  │                                                 │ │
│  │  │  ┌───────────────────────────────────────────┐ │ │
│  │  │  │  Priority Section                         │ │ │
│  │  │  │  ├─ Label: "Priority"                     │ │ │
│  │  │  │  ├─ Select: Dropdown (Low/Medium/High)   │ │ │
│  │  │  │  └─ Badge: Color-coded preview           │ │ │
│  │  │  │     ├─ Green (Low)                        │ │ │
│  │  │  │     ├─ Yellow (Medium)                    │ │ │
│  │  │  │     └─ Red (High)                         │ │ │
│  │  │  └───────────────────────────────────────────┘ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  Form Actions (flex gap-3)                      │ │ │
│  │  │  ├─ Submit Button (flex-1)                      │ │ │
│  │  │  │  └─ Text: "Create Task" or "Creating..."     │ │ │
│  │  │  └─ Clear Button                                │ │ │
│  │  │     └─ Text: "Clear"                            │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
┌──────────────────────────────────────┐
│      Component State Variables       │
│                                      │
│  formData: TaskFormData             │
│  ├─ title: string                   │
│  ├─ dueDate: string                 │
│  └─ priority: 'low' | 'medium' | 'high'
│                                      │
│  error: string | null               │
└──────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Input     │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│   handleChange()         │
│   Updates formData       │
│   Clears error           │
└──────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Component Re-renders    │
│  Form reflects updates   │
└──────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   User Submits Form      │
└──────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   handleSubmit()         │
│   ├─ Prevent default     │
│   ├─ Clear error         │
│   └─ Validate            │
└──────────────────────────┘
       │
       ├──(Invalid)──┐
       │             │
       │             ▼
       │         ┌──────────────────┐
       │         │ Show error msg   │
       │         │ Focus on issue   │
       │         └──────────────────┘
       │
       ├──(Valid)──┐
       │           │
       │           ▼
       │    ┌──────────────────────┐
       │    │  Call onSubmit()     │
       │    │  (async allowed)     │
       │    └──────────────────────┘
       │           │
       │           ├──(Success)──┐
       │           │             │
       │           │             ▼
       │           │      ┌─────────────────┐
       │           │      │ Reset form      │
       │           │      │ Clear error     │
       │           │      │ Re-render       │
       │           │      └─────────────────┘
       │           │
       │           ├──(Error)──┐
       │           │           │
       │           │           ▼
       │           │    ┌─────────────────┐
       │           │    │ Show error msg  │
       │           │    │ Keep form data  │
       │           │    └─────────────────┘
       │           │
       ▼           ▼
      Done       Error
```

## Validation Flow

```
Input Submitted
      │
      ▼
┌─────────────────────────────┐
│ Is title empty or blank?    │
└──────┬──────────────────────┘
       │
       ├─(YES)─► Show: "Task title is required" ✗
       │
       └─(NO)──┐
              │
              ▼
       ┌─────────────────────────────┐
       │ Is title < 3 characters?    │
       └──────┬──────────────────────┘
              │
              ├─(YES)─► Show: "Task title must be at least 3 characters long" ✗
              │
              └─(NO)──┐
                     │
                     ▼
              ┌─────────────────────────────┐
              │ Is dueDate in the past?     │
              │ (if provided)               │
              └──────┬──────────────────────┘
                     │
                     ├─(YES)─► HTML5 prevents this (min="today")
                     │
                     └─(NO)──┐
                            │
                            ▼
                     ┌─────────────────────────────┐
                     │ Priority in valid set?      │
                     │ ('low'|'medium'|'high')     │
                     └──────┬──────────────────────┘
                            │
                            ├─(NO)─► Should not happen (select element)
                            │
                            └─(YES)─► All valid! ✓
                                     │
                                     ▼
                              Call onSubmit()
```

## Event Handlers

```
┌────────────────────────────────────────┐
│         Event Handlers                 │
│                                        │
│ handleChange(e)                        │
│ └─ On input/select change              │
│    ├─ Update formData[name]            │
│    └─ Clear error message              │
│                                        │
│ handleSubmit(e)                        │
│ └─ On form submit                      │
│    ├─ Prevent default                  │
│    ├─ Clear error                      │
│    ├─ Validate                         │
│    ├─ Call onSubmit()                  │
│    ├─ Reset form (if success)          │
│    └─ Show error (if fail)             │
│                                        │
│ getTodayDate()                         │
│ └─ Helper for date input min           │
│    └─ Returns ISO date string          │
│                                        │
│ onClick (Clear button)                 │
│ └─ Reset form manually                 │
│    ├─ Clear formData                   │
│    └─ Clear error                      │
└────────────────────────────────────────┘
```

## Integration Points

```
┌───────────────────────────────────────────┐
│         External Integration              │
│                                           │
│ Props:                                    │
│ ├─ onSubmit(data)                        │
│ │  └─ Called with validated form data    │
│ │     { title, dueDate, priority }       │
│ │                                        │
│ └─ isLoading?                            │
│    └─ Disables all controls when true    │
│                                          │
│ Return:                                   │
│ └─ JSX Form Element                      │
│    └─ Can be rendered anywhere           │
└───────────────────────────────────────────┘
```

## Styling Architecture

```
┌──────────────────────────────────────────────┐
│            Tailwind CSS Classes              │
│                                              │
│ Form Container:                              │
│ └─ rounded-lg border shadow-sm               │
│    dark:border-gray-800 dark:bg-gray-900     │
│                                              │
│ Input Fields:                                │
│ └─ rounded-md border px-4 py-2               │
│    disabled:bg-gray-100 dark:disabled:bg-... │
│                                              │
│ Buttons:                                     │
│ ├─ Submit: bg-blue-600 hover:bg-blue-700    │
│ └─ Clear: border hover:bg-gray-50            │
│                                              │
│ Labels:                                      │
│ └─ text-sm font-medium                       │
│    dark:text-gray-300                        │
│                                              │
│ Priority Badges:                             │
│ ├─ Low: bg-green-100 text-green-800          │
│ ├─ Medium: bg-yellow-100 text-yellow-800     │
│ └─ High: bg-red-100 text-red-800             │
│    (+ dark: variants)                        │
│                                              │
│ Error Alert:                                 │
│ └─ bg-red-50 text-red-700                    │
│    dark:bg-red-900/20 dark:text-red-200      │
└──────────────────────────────────────────────┘
```

## Component Props Interface

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

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: '...' },
  { value: 'medium', label: 'Medium', color: '...' },
  { value: 'high', label: 'High', color: '...' },
] as const
```

## Error Handling Flow

```
┌─────────────────────────┐
│  handleSubmit() Error   │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  try {                               │
│    await onSubmit(formData)          │
│  } catch (err) {                     │
│    if (err instanceof Error)         │
│      setError(err.message)           │
│    else                              │
│      setError('Failed to create...')│
│  }                                   │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Component Re-renders                │
│  with error message displayed        │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Error Alert Box Visible             │
│  User can modify and retry           │
└──────────────────────────────────────┘
```

## Loading State Management

```
When isLoading={true}:

┌─────────────────────────────┐
│  All Inputs & Selects       │
│  └─ disabled={true}         │
│     └─ bg-gray-100          │
│     └─ text-gray-500        │
│                             │
│  Submit Button              │
│  ├─ disabled={true}         │
│  ├─ bg-gray-400             │
│  ├─ cursor-not-allowed      │
│  └─ Text: "Creating..."     │
│                             │
│  Clear Button               │
│  └─ disabled={true}         │
│     └─ cursor-not-allowed   │
│                             │
│  Result: Form appears frozen│
│  preventing user mistakes   │
└─────────────────────────────┘
```

---

**Note:** This architecture ensures a clean, maintainable, and user-friendly form component that integrates seamlessly with the FocusFlow Todo application.
