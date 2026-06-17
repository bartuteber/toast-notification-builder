<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    block?: boolean
  }>(),
  { variant: 'primary', block: false },
)
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="[`btn--${variant}`, { 'is-block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: var(--space-3) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;

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
