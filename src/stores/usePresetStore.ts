import { defineStore } from 'pinia'
import type { NotificationDraft, Preset } from '@/types/notification'
import { loadJSON, saveJSON } from '@/lib/storage'

const STORAGE_KEY = 'toast-presets'

export const usePresetStore = defineStore('presets', {
  state: (): { presets: Preset[] } => ({
    presets: loadJSON<Preset[]>(STORAGE_KEY, []),
  }),
  actions: {
    save(name: string, config: NotificationDraft) {
      this.presets.push({
        id: crypto.randomUUID(),
        name,
        config: { ...config }, // snapshot — later config edits don't leak in
        createdAt: new Date().toISOString(),
      })
      this.persist()
    },

    remove(id: string) {
      this.presets = this.presets.filter((preset) => preset.id !== id)
      this.persist()
    },

    persist() {
      saveJSON(STORAGE_KEY, this.presets)
    },
  },
})
