export interface Task {
  id: number
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  completed?: boolean
}

interface TaskCardProps {
  task: Task
  onToggle?: (id: number) => void
  onDelete?: (id: number) => void
}

const PRIORITY_CONFIG = {
  low: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    label: 'Low',
  },
  medium: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    label: 'Medium',
  },
  high: {
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    label: 'High',
  },
} as const

const getDaysUntilDue = (dateString: string): number | null => {
  if (!dateString) return null
  const dueDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getDateStatus = (daysUntilDue: number | null): string | null => {
  if (daysUntilDue === null) return null
  if (daysUntilDue < 0) return 'Overdue'
  if (daysUntilDue === 0) return 'Today'
  if (daysUntilDue === 1) return 'Tomorrow'
  if (daysUntilDue <= 7) return `${daysUntilDue} days`
  return null
}

const getDateStatusColor = (daysUntilDue: number | null): string => {
  if (daysUntilDue === null) return ''
  if (daysUntilDue < 0) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  if (daysUntilDue === 0)
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  if (daysUntilDue <= 7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  return ''
}

/**
 * CheckCircleIcon - SVG icon for completed state
 */
function CheckCircleIcon() {
  return (
    <svg
      className="h-5 w-5 text-green-600 dark:text-green-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/**
 * CircleIcon - SVG icon for incomplete state
 */
function CircleIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v.01M12 12v.01M12 16v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

/**
 * TrashIcon - SVG icon for delete button
 */
function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

/**
 * TaskCard Component
 * Displays a single task with:
 * - Task title with completion toggle and visual feedback
 * - Due date with urgency indicator
 * - Priority badge
 * - Delete button
 * - Smooth animations and transitions
 */
export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const daysUntilDue = getDaysUntilDue(task.dueDate)
  const dateStatus = getDateStatus(daysUntilDue)
  const dateStatusColor = getDateStatusColor(daysUntilDue)
  const priorityConfig = PRIORITY_CONFIG[task.priority]

  const handleToggle = () => {
    // Provide visual feedback
    onToggle?.(task.id)

    // Trigger haptic feedback if available (mobile browsers)
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  return (
    <div
      className={`group rounded-lg border transition-all duration-300 ${
        task.completed
          ? 'border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-700/50'
      } ${task.completed ? 'scale-100' : 'hover:scale-[1.01]'}`}
      style={{
        transformOrigin: 'center',
      }}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Checkbox/Complete Button with enhanced feedback */}
        <button
          onClick={handleToggle}
          className={`mt-1 flex-shrink-0 transition-all duration-300 ${
            task.completed
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-400 hover:text-purple-600 dark:text-gray-600 dark:hover:text-purple-400'
          } hover:scale-110 active:scale-95`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          title={task.completed ? 'Click to mark incomplete' : 'Click to mark complete'}
        >
          {task.completed ? <CheckCircleIcon /> : <CircleIcon />}
        </button>

        {/* Task Content */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-base font-medium transition-all duration-300 ${
              task.completed
                ? 'line-through text-gray-400 dark:text-gray-600'
                : 'text-gray-900 dark:text-gray-50'
            }`}
          >
            {task.title}
          </p>

          {/* Task Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Due Date Badge */}
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
                {dateStatus && (
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium transition-colors duration-200 ${dateStatusColor}`}
                  >
                    {dateStatus}
                  </span>
                )}
              </div>
            )}

            {/* Priority Badge */}
            <div
              className={`rounded-full px-2 py-1 text-xs font-medium transition-colors duration-200 ${priorityConfig.color}`}
            >
              {priorityConfig.label}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete?.(task.id)}
          className="flex-shrink-0 rounded p-2 text-gray-400 transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          aria-label="Delete task"
          title="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}
