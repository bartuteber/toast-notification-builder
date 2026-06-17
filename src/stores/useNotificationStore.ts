import { defineStore } from 'pinia'
import type { NotificationDraft, NotificationState } from '@/types/notification'

// Auto-dismiss timers are side effects, not state — keep them out of the
// reactive store, in a module-level map keyed by notification id.
const timers = new Map<string, ReturnType<typeof setTimeout>>()

export const useNotificationStore = defineStore('notifications', {
  state: (): NotificationState => ({
    active: [],
  }),
  actions: {
    // Snapshot the draft config into a live notification. The draft's duration
    // is in seconds (0 = persistent); it's converted to ms here, at the boundary.
    show(config: NotificationDraft) {
      const id = crypto.randomUUID()
      const durationMs = config.duration === 0 ? 0 : config.duration * 1000

      this.active.push({
        ...config,
        duration: durationMs,
        id,
        createdAt: Date.now(),
      })

      if (durationMs > 0) {
        timers.set(
          id,
          setTimeout(() => this.dismiss(id), durationMs),
        )
      }
    },

    dismiss(id: string) {
      const timer = timers.get(id)
      if (timer !== undefined) {
        // Clear timeout if user manually dismisses
        clearTimeout(timer)
        timers.delete(id)
      }
      this.active = this.active.filter((notification) => notification.id !== id)
    },
  },
})
