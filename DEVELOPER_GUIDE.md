# Developer Guide - Task Status Toggle Implementation

## Quick Reference

### Using the Toast Component

```typescript
import { useState } from 'react'
import { Toast } from '@/components/toast-notification'

export function MyComponent() {
  const [toast, setToast] = useState(null)

  const showSuccess = () => {
    setToast({
      message: 'Success!',
      type: 'success',
      duration: 3000,
    })
  }

  return (
    <>
      <button onClick={showSuccess}>Show Toast</button>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
```

### Toast Types

```typescript
// Success - Green background with checkmark
setToast({
  message: 'Task completed!',
  type: 'success',
  duration: 2500,
})

// Error - Red background
setToast({
  message: 'Failed to complete action',
  type: 'error',
  duration: 3000,
})

// Info - Blue background
setToast({
  message: 'Task deleted',
  type: 'info',
  duration: 2500,
})
```

### Task Toggle Implementation

The TaskCard component automatically handles:
- Visual state changes
- Icon transitions
- Haptic feedback (mobile)
- ARIA labels

Example usage:
```typescript
<TaskCard
  task={task}
  onToggle={(id) => {
    // Update your state here
    updateTaskStatus(id)
  }}
  onDelete={(id) => {
    // Handle deletion
    deleteTask(id)
  }}
/>
```

## Styling Examples

### Button with Hover Scale

```tsx
<button
  className="transition-all duration-300 hover:scale-110 active:scale-95"
>
  Click me
</button>
```

### Card with Completion State

```tsx
<div
  className={`transition-all duration-300 ${
    isCompleted
      ? 'border-green-200 bg-green-50/50'
      : 'border-gray-200 bg-white hover:border-purple-300'
  }`}
>
  {/* content */}
</div>
```

### Text with Strikethrough

```tsx
<p
  className={`transition-all duration-300 ${
    isCompleted
      ? 'line-through text-gray-400'
      : 'text-gray-900'
  }`}
>
  Task title
</p>
```

## Accessibility Patterns

### ARIA Labels
```tsx
<button
  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
  title={task.completed ? 'Click to mark incomplete' : 'Click to mark complete'}
>
  {/* icon */}
</button>
```

### Live Region (for toasts)
```tsx
<div
  role="status"
  aria-live="polite"
>
  {message}
</div>
```

## Haptic Feedback

Only use on interactive elements that trigger state changes:

```typescript
const handleInteraction = () => {
  // Trigger your action
  updateState()

  // Add haptic feedback (mobile only)
  if (navigator.vibrate) {
    navigator.vibrate(10) // 10ms vibration
  }
}
```

**Duration Guidelines:**
- Light feedback: 5-10ms
- Medium feedback: 15-25ms
- Strong feedback: 30-50ms

## Color System for Status

### Incomplete Task
- Icon: `text-gray-400` (hover: `text-purple-600`)
- Card: `bg-white` (hover: `border-purple-300`)
- Text: `text-gray-900`

### Completed Task
- Icon: `text-green-600` (dark: `text-green-400`)
- Card: `bg-green-50/50` (dark: `bg-green-900/10`)
- Border: `border-green-200` (dark: `border-green-900/30`)
- Text: `text-gray-400` with `line-through`

## Animation Timings

```typescript
// Standard transitions
duration-300 // 300ms (smooth, noticeable but not jarring)

// Scale effects
hover:scale-110  // 10% larger on hover
hover:scale-[1.01] // 1% larger for subtle effect
active:scale-95  // 5% smaller when pressed

// Color transitions
transition-all   // Apply to multiple properties
```

## Testing Your Changes

### Manual Testing Checklist
```
[ ] Task completion toggles visual state
[ ] Toast notification appears and disappears
[ ] Haptic feedback works on mobile
[ ] Keyboard navigation works (Tab, Enter, Space)
[ ] Screen reader announces changes
[ ] Light mode colors display correctly
[ ] Dark mode colors display correctly
[ ] Animations are smooth (60fps)
[ ] Mobile responsive on small screens
```

### Browser DevTools Tips

**Check animations:**
- Open DevTools → Animations panel
- Look for smooth transitions (no jank)
- Verify timing matches expected duration

**Check accessibility:**
- DevTools → Lighthouse → Accessibility
- Run accessibility audit
- Verify contrast ratios pass WCAG AA

**Test haptic feedback:**
- Open mobile browser DevTools
- Console: `navigator.vibrate(100)`
- Device should vibrate

## Performance Considerations

### CSS Transitions vs JavaScript Animations

**Use CSS transitions for:**
- Simple state changes (hover, active, completed)
- Color, scale, opacity changes
- Better performance (GPU accelerated)

**Use JavaScript (Framer Motion) for:**
- Complex choreographed animations
- Staggered animations
- Advanced easing functions

### Current Implementation
- ✅ Uses CSS transitions (optimal performance)
- ✅ GPU-accelerated transforms (scale, opacity)
- ✅ Minimal JavaScript (event handlers only)
- ✅ No performance impact on older devices

## Common Customizations

### Change Animation Duration

Find this pattern:
```tsx
className="... transition-all duration-300 ..."
```

Change `duration-300` to:
- `duration-150` for faster (150ms)
- `duration-500` for slower (500ms)

### Change Toast Position

In `toast-notification.tsx`:
```tsx
// Current: bottom-right
className="fixed bottom-4 right-4 ..."

// Change to: top-right
className="fixed top-4 right-4 ..."

// Change to: bottom-left
className="fixed bottom-4 left-4 ..."
```

### Change Toast Color

In `toast-notification.tsx`:
```tsx
success: {
  bg: 'bg-green-500', // Change green to your color
  icon: <CheckMarkIcon />,
}
```

## Debugging Tips

### Visual State Not Updating?
```typescript
// Make sure you're using spread operator
setTasks(prev =>
  prev.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  )
)
// ❌ Don't mutate directly
// task.completed = !task.completed // WRONG!
```

### Toast Not Dismissing?
```typescript
// Check duration is set
setToast({
  message: 'Message',
  type: 'success',
  duration: 3000, // Must be set!
  onClose: () => setToast(null),
})
```

### Haptic Not Working?
```typescript
// Check device supports Vibration API
if (navigator.vibrate) {
  navigator.vibrate(10)
} else {
  console.log('Haptic feedback not supported')
}
```

## Links and Resources

- [Toast Component](./src/components/toast-notification.tsx)
- [Task Card Component](./src/components/task-card.tsx)
- [Task List Component](./src/components/task-list.tsx)
- [Implementation Guide](./TASK_STATUS_TOGGLE_IMPLEMENTATION.md)
- [Feature Summary](./FEATURE_SUMMARY.md)

## Questions?

Refer to the implementation files for complete examples:
- Toast notifications: `src/components/toast-notification.tsx`
- Task interactions: `src/components/task-card.tsx`
- Integration example: `src/pages/task-form-demo.tsx`

All code includes detailed comments for easy understanding.
