<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

// v-model holds the selected Iconify icon name (e.g. 'mdi:bell').
const selected = defineModel<string>({ required: true })

const props = defineProps<{
  options: readonly string[]
  label?: string
  columns?: number
}>()

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns ?? 6}, 1fr)`,
}))
</script>

<template>
  <div class="icon-picker">
    <span v-if="label" class="icon-picker-label">{{ label }}</span>
    <div class="icon-picker-grid" :style="gridStyle">
      <button
        v-for="name in options"
        :key="name"
        type="button"
        class="icon-picker-item"
        :class="{ 'is-active': name === selected }"
        :title="name"
        @click="selected = name"
      >
        <Icon :icon="name" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  &-label {
    font-size: var(--font-sm);
    font-weight: 600;
  }

  &-grid {
    display: grid;
    gap: var(--space-2);
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-size: 1.25rem;

    &:hover {
      border-color: var(--color-primary);
    }

    &.is-active {
      border-color: var(--color-primary);
      background: var(--color-primary);
      color: var(--color-on-primary);
    }
  }
}
</style>
