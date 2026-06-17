export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type AnimationValue = 'fade' | 'slide' | 'bounce'

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  duration: number // in milliseconds, 0 = persistent
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
}

// NotificationConfig without the instance id — the shape of an editable draft
// and of a saved preset's config.
export type NotificationDraft = Omit<NotificationConfig, 'id'>

// The fields a toast actually renders — shared by the live preview and the
// real overlay. Position/duration are the container's/timer's concern, not the
// item's, so they're intentionally excluded.
export type ToastVisual = Pick<
  NotificationConfig,
  'type' | 'title' | 'message' | 'backgroundColor' | 'textColor' | 'showIcon' | 'showCloseButton'
>

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}

// Shape of the notification store's state: the toasts currently on screen.
export interface NotificationState {
  active: ActiveNotification[]
}

export interface Preset {
  id: string
  name: string
  config: NotificationDraft
  createdAt: string
}
