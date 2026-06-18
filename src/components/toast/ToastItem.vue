<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { Icon } from '@iconify/vue'
import type { ToastProgress, ToastVisual } from '@/types/notification'

// Pure presentational toast. Knows nothing about the store — it just renders
// the visual fields, plus an optional progress bar driven entirely by props.
// Reused by the live preview and the real overlay.
const props = defineProps<{
  config: ToastVisual
  progress?: ToastProgress
}>()

defineEmits<{ close: [] }>()

// Countdown drives the fill via a CSS animation whose duration we set inline;
// static drives it via a fixed scaleX. The keyframe/animation props live in CSS.
const progressFillStyle = computed<CSSProperties | undefined>(() => {
  const progress = props.progress
  if (progress === undefined) return undefined
  return progress.mode === 'countdown'
    ? { animationDuration: `${progress.durationMs}ms` }
    : { transform: `scaleX(${progress.fraction})` }
})
</script>

<template>
  <div class="toast" :style="{ background: config.backgroundColor, color: config.textColor }">
    <Icon v-if="config.showIcon && config.icon" class="toast-icon" :icon="config.icon" />

    <div class="toast-body">
      <strong v-if="config.title" class="toast-title">{{ config.title }}</strong>
      <p v-if="config.message" class="toast-message">{{ config.message }}</p>
    </div>

    <button
      v-if="config.showCloseButton"
      type="button"
      class="toast-close"
      aria-label="Close"
      @click="$emit('close')"
    >
      <Icon icon="mdi:close" />
    </button>

    <div v-if="progress" class="toast-progress">
      <div
        class="toast-progress-fill"
        :class="{ 'is-countdown': progress.mode === 'countdown' }"
        :style="progressFillStyle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast {
  position: relative;
  // clip the progress bar to the toast's rounded corners
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-width: 260px;
  max-width: 360px;
  padding: var(--space-4);
  border-radius: var(--radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  &-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 4px;
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
    display: flex;
    align-items: center;
    justify-content: center;
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

  // full-width track pinned to the bottom edge of the toast
  &-progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0.15);

    &-fill {
      height: 100%;
      // inherits the toast's text color, so it always contrasts the background
      background: currentColor;
      opacity: 0.85;
      transform-origin: left;
      // static default; countdown overrides via the animation below
      transform: scaleX(1);

      // duration is supplied inline per toast; the rest lives here
      &.is-countdown {
        animation-name: toast-progress-countdown;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    }
  }
}

@keyframes toast-progress-countdown {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
