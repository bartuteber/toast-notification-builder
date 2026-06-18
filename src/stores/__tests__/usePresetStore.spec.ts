import { setActivePinia, createPinia } from 'pinia'
import { usePresetStore } from '@/stores/usePresetStore'
import type { NotificationDraft } from '@/types/notification'

const STORAGE_KEY = 'toast-presets'

// A complete draft — every field of NotificationDraft, so the snapshot we
// assert on round-trips through JSON without losing anything.
const draft: NotificationDraft = {
  type: 'success',
  title: 'Saved',
  message: 'Everything went fine.',
  duration: 5,
  position: 'top-right',
  backgroundColor: '#22c55e',
  textColor: '#ffffff',
  showIcon: true,
  icon: 'mdi:check-circle',
  showCloseButton: true,
  animation: 'fade',
}

describe('usePresetStore', () => {
  beforeEach(() => {
    // Fresh storage + fresh Pinia per test, so nothing leaks between cases.
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('saves a preset and persists it to localStorage', () => {
    const store = usePresetStore()
    store.save('My preset', draft)

    expect(store.presets).toHaveLength(1)
    expect(store.presets[0]?.name).toBe('My preset')
    expect(store.presets[0]?.config).toEqual(draft)

    // The write actually reached localStorage, not just in-memory state.
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
  })

  it('reloads persisted presets in a fresh store (round-trip)', () => {
    const first = usePresetStore()
    first.save('Persisted', draft)

    // Simulate a page reload: a brand-new Pinia means a new store instance,
    // whose state initializer re-reads localStorage via loadJSON.
    setActivePinia(createPinia())
    const reloaded = usePresetStore()

    expect(reloaded.presets).toHaveLength(1)
    expect(reloaded.presets[0]?.name).toBe('Persisted')
    expect(reloaded.presets[0]?.config).toEqual(draft)
  })

  it('removes a preset and the removal survives a reload', () => {
    const store = usePresetStore()
    store.save('A', draft)
    store.save('B', draft)

    const saved = store.presets[0]
    expect(saved).toBeDefined()
    if (!saved) return
    store.remove(saved.id)

    expect(store.presets).toHaveLength(1)
    expect(store.presets[0]?.name).toBe('B')

    setActivePinia(createPinia())
    const reloaded = usePresetStore()
    expect(reloaded.presets).toHaveLength(1)
    expect(reloaded.presets[0]?.name).toBe('B')
  })

  it('snapshots the config so later draft mutations do not leak in', () => {
    const store = usePresetStore()
    const mutable: NotificationDraft = { ...draft }

    store.save('snapshot', mutable)
    mutable.title = 'changed after save'

    expect(store.presets[0]?.config.title).toBe(draft.title)
  })
})
