import type { NotificationDraft, NotificationType } from '@/types/notification'
import { defineStore } from 'pinia'
import { TYPE_DEFAULTS } from '@/lib/defaults'

export const useConfigStore = defineStore('config', {
  state: (): NotificationDraft => ({
    type: 'success',
    title: TYPE_DEFAULTS.success.title,
    message: TYPE_DEFAULTS.success.message,
    duration: 3,
    position: 'top-left',
    backgroundColor: TYPE_DEFAULTS.success.backgroundColor,
    textColor: '#FFFFFF',
    showIcon: true,
    showCloseButton: true,
  }),
  getters: {
    isPersistent: (state) => state.duration === 0,
  },
  actions: {
    // Selecting a type fills its defaults (background + title + message); the
    // user can still override any of them afterwards via the form fields.
    setType(type: NotificationType) {
      const defaults = TYPE_DEFAULTS[type]
      this.type = type
      this.backgroundColor = defaults.backgroundColor
      this.title = defaults.title
      this.message = defaults.message
    },
    setPersistent(value: boolean) {
      this.duration = value ? 0 : 1
    },
    reset() {
      this.$reset()
    },
  },
})
