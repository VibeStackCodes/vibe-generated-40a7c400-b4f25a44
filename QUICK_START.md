# Quick Start Guide - Task Input Form Component

## 🚀 Getting Started

### 1. Using the Component

```tsx
import { TaskInputForm } from '@/components/task-input-form'

export function MyPage() {
  const handleTaskSubmit = async (data) => {
    console.log('New task:', data)
    // Send to your API
  }

  return (
    <div>
      <TaskInputForm onSubmit={handleTaskSubmit} />
    </div>
  )
}
```

### 2. View the Demo

Run the development server:
```bash
npm run dev
```

Visit http://localhost:5173/ to see the component in action.

## 📦 Component Props

```typescript
interface TaskInputFormProps {
  onSubmit: (data: TaskFormData) => void | Promise<void>  // Required
  isLoading?: boolean                                      // Optional
}

interface TaskFormData {
  title: string                         // Task name (required, 3-100 chars)
  dueDate: string                       // ISO date string (optional)
  priority: 'low' | 'medium' | 'high'   // Task priority (required)
}
```

## 📝 Form Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| **Task Title** | Text | ✅ Yes | 3-100 characters |
| **Due Date** | Date | ❌ No | Cannot be in past |
| **Priority** | Select | ✅ Yes | low, medium, high |

## 🎯 Form Behavior

### Default Values
- Title: Empty
- Due Date: Empty
- Priority: "medium"

### On Submit
- Form validates input
- Calls `onSubmit` callback
- Resets form on success
- Shows error on failure

### Loading State
- All fields disabled when `isLoading={true}`
- Submit button shows "Creating..." text
- All inputs appear grayed out

## 🎨 Styling

The component uses Tailwind CSS with full dark mode support:
- Automatically adapts to system dark mode
- Uses `dark:` prefix classes
- All colors are accessible (WCAG AA)

## ✅ Validation Examples

```typescript
// Valid submission
{
  title: "Complete project proposal",
  dueDate: "2024-12-31",
  priority: "high"
}

// Valid submission (minimal)
{
  title: "Buy groceries",
  dueDate: "",
  priority: "medium"
}

// Invalid - title too short
{
  title: "Go",  // ❌ Minimum 3 characters
  dueDate: "2024-12-31",
  priority: "low"
}

// Invalid - empty title
{
  title: "",  // ❌ Required
  dueDate: "2024-12-31",
  priority: "low"
}
```

## 🔄 Complete Example

```tsx
import { useState } from 'react'
import { TaskInputForm } from '@/components/task-input-form'

interface Task {
  id: number
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      // API call
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create task')

      const newTask = await response.json()
      setTasks(prev => [newTask, ...prev])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Tasks</h1>

      <TaskInputForm onSubmit={handleSubmit} isLoading={loading} />

      <div className="mt-8 space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="p-4 border rounded">
            <h3 className="font-semibold">{task.title}</h3>
            {task.dueDate && <p className="text-sm">Due: {task.dueDate}</p>}
            <p className="text-sm capitalize">Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 📍 File Locations

| File | Purpose |
|------|---------|
| `src/components/task-input-form.tsx` | Main component |
| `src/pages/task-form-demo.tsx` | Demo page |
| `src/routes/index.tsx` | Route definitions |
| `TASK_FORM_COMPONENT.md` | Full documentation |
| `IMPLEMENTATION_SUMMARY.md` | Implementation details |

## 🐛 Troubleshooting

### Form not submitting
- Check if `onSubmit` callback is provided
- Check browser console for errors
- Verify form validation passes

### Styling looks wrong
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild project (`npm run build`)
- Check if Tailwind CSS is loaded

### Dark mode not working
- Ensure system prefers dark mode
- Check HTML root element has `dark` class
- Verify Tailwind is configured correctly

## 📚 Additional Resources

- [Full Component Documentation](./TASK_FORM_COMPONENT.md)
- [Implementation Details](./IMPLEMENTATION_SUMMARY.md)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## ✨ Tips

- The component auto-resets on successful submission
- Use `isLoading` prop to prevent double-submissions
- Error messages are user-friendly
- Due date cannot be set to past dates
- Character count helps users stay within limits

## 🚀 Next Steps

1. Install component in your pages
2. Connect to your backend API
3. Add error handling as needed
4. Test with various inputs
5. Customize styling if needed

---

**Need help?** Check the full documentation or refer to the demo page at `src/pages/task-form-demo.tsx`
