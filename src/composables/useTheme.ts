import { ref, watch } from 'vue'
import { loadJSON, saveJSON } from '@/lib/storage'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'toast-theme'

// Module-level singleton: one shared theme across the whole app.
const theme = ref<Theme>(loadJSON<Theme>(STORAGE_KEY, 'light'))

function apply(value: Theme) {
  // tokens.css swaps its custom properties on [data-theme='dark']
  document.documentElement.dataset.theme = value
  saveJSON(STORAGE_KEY, value)
}

apply(theme.value) // set the initial theme on load
watch(theme, apply)

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  return { theme, toggle }
}
