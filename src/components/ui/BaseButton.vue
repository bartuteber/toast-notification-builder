<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    size?: 'sm' | 'md'
    block?: boolean
  }>(),
  { variant: 'primary', size: 'md', block: false },
)
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'is-block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;

  &--md {
    padding: var(--space-3) var(--space-5);
  }

  &--sm {
    padding: var(--space-1) var(--space-3);
    font-size: var(--font-sm);
  }

  &.is-block {
    width: 100%;
  }

  &--primary {
    background: var(--color-primary);
    color: var(--color-on-primary);

    &:hover {
      background: var(--color-primary-hover);
    }
  }

  &--ghost {
    background: var(--color-surface);
    border-color: var(--color-border);
    color: var(--color-text);

    &:hover {
      border-color: var(--color-primary);
    }
  }
}
</style>
