import { FormEvent, useState } from 'react'

interface TaskFormData {
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

interface TaskInputFormProps {
  onSubmit: (data: TaskFormData) => void | Promise<void>
  isLoading?: boolean
}

const PRIORITY_OPTIONS = [
  {
    value: 'low',
    label: 'Low',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  {
    value: 'high',
    label: 'High',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
] as const

/**
 * TaskInputForm Component
 * Provides a form for creating new tasks with:
 * - Task title input
 * - Due date picker
 * - Priority dropdown selector
 */
export function TaskInputForm({ onSubmit, isLoading = false }: TaskInputFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    dueDate: '',
    priority: 'medium',
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.title.trim()) {
      setError('Task title is required')
      return
    }

    if (formData.title.trim().length < 3) {
      setError('Task title must be at least 3 characters long')
      return
    }

    try {
      await onSubmit(formData)
      // Reset form on successful submission
      setFormData({
        title: '',
        dueDate: '',
        priority: 'medium',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Create New Task
      </h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Task Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            disabled={isLoading}
            maxLength={100}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:disabled:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formData.title.length}/100
          </p>
        </div>

        {/* Due Date Input */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due Date <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={isLoading}
            min={getTodayDate()}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700"
          />
        </div>

        {/* Priority Dropdown */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <div className="mt-1 flex items-center gap-2">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={isLoading}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700"
            >
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Priority Badge Preview */}
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_OPTIONS.find(p => p.value === formData.priority)?.color}`}
            >
              {PRIORITY_OPTIONS.find(p => p.value === formData.priority)?.label}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
        <button
          type="reset"
          disabled={isLoading}
          onClick={() => {
            setFormData({
              title: '',
              dueDate: '',
              priority: 'medium',
            })
            setError(null)
          }}
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
