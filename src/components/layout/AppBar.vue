<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTheme } from '@/composables/useTheme'

defineProps<{
  title: string
}>()

// useTheme is a module-level singleton, so owning the toggle here keeps the
// parent container free of theme concerns.
const { theme, toggle } = useTheme()
</script>

<template>
  <div class="app-bar">
    <header class="app-bar-inner">
      <h1 class="app-bar-title">{{ title }}</h1>
      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
        @click="toggle"
      >
        <Icon :icon="theme === 'light' ? 'mdi:weather-night' : 'mdi:white-balance-sunny'" />
      </button>
    </header>
  </div>
</template>

<style scoped lang="scss">
.app-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  height: var(--app-bar-height);

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 0 var(--space-6);
  }

  &-title {
    margin: 0;
    font-size: var(--font-lg);
    font-weight: 700;
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
  }
}
</style>
