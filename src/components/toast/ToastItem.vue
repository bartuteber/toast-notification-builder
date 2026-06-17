<script setup lang="ts">
import { computed } from 'vue'
import type { NotificationType, ToastVisual } from '@/types/notification'

// Pure presentational toast. Knows nothing about the store — it just renders
// the visual fields. Reused by the live preview now and the real overlay later.
const props = defineProps<{
  config: ToastVisual
}>()

defineEmits<{ close: [] }>()

const ICONS: Record<NotificationType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

const icon = computed(() => ICONS[props.config.type])
</script>

<template>
  <div class="toast" :style="{ background: config.backgroundColor, color: config.textColor }">
    <span v-if="config.showIcon" class="toast-icon">{{ icon }}</span>

    <div class="toast-body">
      <strong v-if="config.title" class="toast-title">{{ config.title }}</strong>
      <p v-if="config.message" class="toast-message">{{ config.message }}</p>
    </div>

    <button v-if="config.showCloseButton" type="button" class="toast-close" @click="$emit('close')">
      ×
    </button>
  </div>
</template>

<style scoped lang="scss">
.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-width: 260px;
  max-width: 360px;
  padding: var(--space-4);
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  &-icon {
    font-size: 1.1rem;
    line-height: 1.4;
    flex-shrink: 0;
  }

  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &-title {
    font-weight: 700;
  }

  &-message {
    font-size: var(--font-sm);
    opacity: 0.95;
    word-break: break-word;
  }

  &-close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
