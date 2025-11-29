import { useEffect, useState } from 'react'

export interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

/**
 * CheckMarkIcon - SVG icon for success toast
 */
function CheckMarkIcon() {
  return (
    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/**
 * Toast Notification Component
 * Displays temporary notifications with automatic dismissal
 */
export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const typeConfig = {
    success: {
      bg: 'bg-green-500',
      icon: <CheckMarkIcon />,
    },
    error: {
      bg: 'bg-red-500',
      icon: null,
    },
    info: {
      bg: 'bg-blue-500',
      icon: null,
    },
  }

  const config = typeConfig[type]

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 rounded-lg ${config.bg} px-4 py-3 text-white shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 sm:bottom-6 sm:right-6`}
      role="status"
      aria-live="polite"
    >
      {config.icon && <div className="flex-shrink-0">{config.icon}</div>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
