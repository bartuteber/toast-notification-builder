<script setup lang="ts" generic="T extends string">
import { computed } from 'vue'

interface SegmentOption {
  value: T
  label: string
  icon?: string
}

const selected = defineModel<T>('selected', { required: true })

const props = defineProps<{
  options: readonly SegmentOption[]
  label?: string
  columns?: number
  // when set, the active item uses this color instead of the default primary
  activeColor?: string
}>()

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns ?? props.options.length}, 1fr)`,
}))
</script>

<template>
  <div class="seg">
    <span v-if="label" class="seg-label">{{ label }}</span>
    <div class="seg-group" :style="gridStyle">
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        class="seg-item"
        :class="{ 'is-active': opt.value === selected }"
        :style="
          activeColor && opt.value === selected
            ? { background: activeColor, borderColor: activeColor }
            : undefined
        "
        @click="selected = opt.value"
      >
        <span v-if="opt.icon" class="seg-icon">{{ opt.icon }}</span>
        <span>{{ opt.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.seg {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  &-label {
    font-size: var(--font-sm);
    font-weight: 600;
  }

  &-group {
    display: grid;
    gap: var(--space-2);
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    cursor: pointer;
    font-size: var(--font-sm);

    &:hover {
      border-color: var(--color-primary);
    }

    &.is-active {
      border-color: var(--color-primary);
      background: var(--color-primary);
      color: var(--color-on-primary);
    }
  }

  &-icon {
    font-size: 1.1rem;
  }
}
</style>
