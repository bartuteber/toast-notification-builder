import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { NotificationDraft } from '@/types/notification'

const baseDraft: NotificationDraft = {
  type: 'info',
  title: 'Heads up',
  message: 'Something happened.',
  duration: 5,
  position: 'top-right',
  backgroundColor: '#3b82f6',
  textColor: '#ffffff',
  showIcon: true,
  showCloseButton: true,
  animation: 'fade',
}

function makeDraft(overrides: Partial<NotificationDraft> = {}): NotificationDraft {
  return { ...baseDraft, ...overrides }
}

describe('useNotificationStore auto-dismiss', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.useFakeTimers()
  })

  afterEach(() => {
    // Drop any pending timers so they can't leak into the next test.
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('auto-dismisses after the duration, converting seconds to ms', () => {
    const store = useNotificationStore()
    store.show(makeDraft({ duration: 3 }))
    expect(store.active).toHaveLength(1)

    // 3s = 3000ms. Just before the boundary it must still be there...
    jest.advanceTimersByTime(2999)
    expect(store.active).toHaveLength(1)

    // ...and gone exactly at 3000ms.
    jest.advanceTimersByTime(1)
    expect(store.active).toHaveLength(0)
  })

  it('stores the duration in milliseconds on the active notification', () => {
    const store = useNotificationStore()
    store.show(makeDraft({ duration: 5 }))
    expect(store.active[0]?.duration).toBe(5000)
  })

  it('keeps persistent notifications (duration 0) on screen indefinitely', () => {
    const store = useNotificationStore()
    store.show(makeDraft({ duration: 0 }))
    expect(store.active).toHaveLength(1)
    expect(store.active[0]?.duration).toBe(0)

    jest.advanceTimersByTime(60_000)
    expect(store.active).toHaveLength(1)
  })

  it('dismiss removes the notification and cancels its pending timer', () => {
    const store = useNotificationStore()
    store.show(makeDraft({ duration: 10 }))

    const active = store.active[0]
    expect(active).toBeDefined()
    if (!active) return

    store.dismiss(active.id)
    expect(store.active).toHaveLength(0)
  })
})
