import { useState } from 'react'
import { TaskInputForm } from '@/components/task-input-form'
import { TaskList } from '@/components/task-list'
import { Toast } from '@/components/toast-notification'
import type { Task } from '@/components/task-card'
import type { ToastProps } from '@/components/toast-notification'

/**
 * Demo page for TaskInputForm and TaskList components
 */
export function TaskFormDemo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nextId, setNextId] = useState(1)
  const [toast, setToast] = useState<Omit<ToastProps, 'onClose'> | null>(null)

  const handleTaskSubmit = async (data: { title: string; dueDate: string; priority: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const newTask: Task = {
      id: nextId,
      title: data.title,
      dueDate: data.dueDate,
      priority: data.priority as 'low' | 'medium' | 'high',
      completed: false,
    }
    setTasks(prev => [newTask, ...prev])
    setNextId(prev => prev + 1)
    setToast({
      message: `Task "${newTask.title}" created`,
      type: 'success',
      duration: 3000,
    })
  }

  const handleTaskToggle = (id: number) => {
    const task = tasks.find(t => t.id === id)
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
    if (task) {
      setToast({
        message: task.completed ? `Task "${task.title}" marked incomplete` : `Task "${task.title}" completed!`,
        type: 'success',
        duration: 2500,
      })
    }
  }

  const handleTaskDelete = (id: number) => {
    const task = tasks.find(t => t.id === id)
    setTasks(prev => prev.filter(task => task.id !== id))
    if (task) {
      setToast({
        message: `Task "${task.title}" deleted`,
        type: 'info',
        duration: 2500,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            FocusFlow Task Manager
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and organize your tasks efficiently
          </p>
        </div>

        {/* Form Section */}
        <TaskInputForm onSubmit={handleTaskSubmit} />

        {/* Task List Section */}
        <TaskList
          tasks={tasks}
          onToggle={handleTaskToggle}
          onDelete={handleTaskDelete}
          emptyStateMessage="No tasks created yet. Add one using the form above!"
        />
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
