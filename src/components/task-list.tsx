import { Task, TaskCard } from '@/components/task-card'

export interface TaskListProps {
  tasks: Task[]
  onToggle?: (id: number) => void
  onDelete?: (id: number) => void
  showEmptyState?: boolean
  emptyStateMessage?: string
  className?: string
}

/**
 * TaskList Component
 * Renders a list of task cards with proper spacing and layout
 * Features:
 * - Responsive grid/list layout
 * - Empty state handling
 * - Task count display
 * - Proper spacing between cards
 */
export function TaskList({
  tasks,
  onToggle,
  onDelete,
  showEmptyState = true,
  emptyStateMessage = 'No tasks yet. Create one to get started!',
  className = '',
}: TaskListProps) {
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className={`w-full ${className}`}>
      {/* Header with task count */}
      {tasks.length > 0 && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Tasks</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {completedCount} of {tasks.length} completed
            </p>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Tasks Grid */}
      {tasks.length > 0 && (
        <div className="space-y-3">
          {/* Active Tasks */}
          <div className="space-y-3">
            {tasks
              .filter(t => !t.completed)
              .map(task => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))}
          </div>

          {/* Completed Tasks Section */}
          {completedCount > 0 && (
            <div>
              <details className="group">
                <summary className="mt-6 cursor-pointer select-none rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Completed ({completedCount})
                    </span>
                    <span className="text-gray-500 transition-transform duration-200 group-open:-rotate-180 dark:text-gray-400">
                      ▼
                    </span>
                  </div>
                </summary>
                <div className="mt-3 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                  {tasks
                    .filter(t => t.completed)
                    .map(task => (
                      <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
                    ))}
                </div>
              </details>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && showEmptyState && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
          <div className="mb-4 inline-block rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <svg
              className="h-8 w-8 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{emptyStateMessage}</p>
        </div>
      )}
    </div>
  )
}
