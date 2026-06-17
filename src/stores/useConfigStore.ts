import type { ActiveNotification, NotificationConfig } from '@/types/notification'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: (): Omit<NotificationConfig, 'id'> => ({
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    duration: 3,
    position: 'top-left',
    backgroundColor: '#22c55e',
    textColor: '#FFFFFF',
    showIcon: true,
    showCloseButton: true,
  }),
  getters: {
    isPersistent: (state) => state.duration === 0,
  },
  actions: {
    setPersistent(value: boolean) {
      this.duration = value ? 0 : 1
    },
    showNotification() {
      const _activeNotification: ActiveNotification = Object.assign(
        { id: crypto.randomUUID(), createdAt: Date.now() },
        this.$state,
      )
    },
    reset() {
      this.$reset()
    },
  },
})
