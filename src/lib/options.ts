import type { AnimationValue, NotificationType, Position } from '@/types/notification'

export const TYPE_OPTIONS = [
  { value: 'success', label: 'Success', icon: 'mdi:check-circle' },
  { value: 'error', label: 'Error', icon: 'mdi:close-circle' },
  { value: 'warning', label: 'Warning', icon: 'mdi:alert' },
  { value: 'info', label: 'Info', icon: 'mdi:information' },
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

// Curated palette for the icon picker. Iconify names from the Material Design
// Icons set ('mdi:'); the four type defaults lead so a freshly-typed toast's
// icon is always visible as selected in the grid.
export const ICON_OPTIONS = [
  'mdi:check-circle',
  'mdi:close-circle',
  'mdi:alert',
  'mdi:information',
  'mdi:bell',
  'mdi:heart',
  'mdi:star',
  'mdi:email',
  'mdi:cart',
  'mdi:download',
  'mdi:upload',
  'mdi:cog',
  'mdi:account',
  'mdi:lock',
  'mdi:calendar',
  'mdi:clock-outline',
  'mdi:fire',
  'mdi:thumb-up',
  'mdi:gift',
  'mdi:lightning-bolt',
] as const satisfies readonly string[]
