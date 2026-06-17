import type { AnimationValue, NotificationType, Position } from '@/types/notification'

export const TYPE_OPTIONS = [
  { value: 'success', label: 'Success', icon: '✓' },
  { value: 'error', label: 'Error', icon: '✕' },
  { value: 'warning', label: 'Warning', icon: '⚠' },
  { value: 'info', label: 'Info', icon: 'ℹ' },
] as const satisfies readonly { value: NotificationType; label: string; icon: string }[]

export const POSITION_OPTIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
] as const satisfies readonly { value: Position; label: string }[]

export const ANIMATION_OPTIONS = [
  { value: 'fade', label: 'Fade' },
  { value: 'slide', label: 'Slide' },
  { value: 'bounce', label: 'Bounce' },
] as const satisfies readonly { value: AnimationValue; label: string }[]
