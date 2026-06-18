import type { NotificationType } from '@/types/notification'

interface TypeDefaults {
  backgroundColor: string
  title: string
  message: string
  icon: string // Iconify icon name
}

// Single source for type-based defaults. Record<NotificationType, …> is
// exhaustive: adding a new notification type forces a compile error here.
export const TYPE_DEFAULTS: Record<NotificationType, TypeDefaults> = {
  success: {
    backgroundColor: '#22c55e',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    icon: 'mdi:check-circle',
  },
  error: {
    backgroundColor: '#ef4444',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    icon: 'mdi:close-circle',
  },
  warning: {
    backgroundColor: '#f59e0b',
    title: 'Warning',
    message: 'Please double-check before continuing.',
    icon: 'mdi:alert',
  },
  info: {
    backgroundColor: '#3b82f6',
    title: 'Info',
    message: 'Here is something you might want to know.',
    icon: 'mdi:information',
  },
}
