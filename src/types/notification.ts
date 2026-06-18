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
  icon: string // Iconify icon name, e.g. 'mdi:check-circle'
  showCloseButton: boolean
  animation: AnimationValue
}

// NotificationConfig without the instance id — the shape of an editable draft
// and of a saved preset's config.
export type NotificationDraft = Omit<NotificationConfig, 'id'>

// The fields a toast actually renders — shared by the live preview and the
// real overlay. Position/duration are the container's/timer's concern, not the
// item's, so they're intentionally excluded.
export type ToastVisual = Pick<
  NotificationConfig,
  | 'type'
  | 'title'
  | 'message'
  | 'backgroundColor'
  | 'textColor'
  | 'showIcon'
  | 'icon'
  | 'showCloseButton'
>

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}

// Drives the optional progress bar shown under a toast. A live toast counts its
// remaining time down over `durationMs`; the preview shows a fixed fill instead.
export type ToastProgress =
  | { mode: 'countdown'; durationMs: number } // animates full -> empty
  | { mode: 'static'; fraction: number } // fixed fill, 0-1, no animation

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
