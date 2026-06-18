<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastItem from '@/components/toast/ToastItem.vue'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { Position } from '@/types/notification'

const store = useNotificationStore()
const { active } = storeToRefs(store)

const POSITIONS: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

// Group by position so each corner stacks independently. All four stacks are
// always rendered (not filtered) so the TransitionGroup stays mounted and can
// animate the first toast in / the last toast out.
const stacks = computed(() =>
  POSITIONS.map((position) => ({
    position,
    items: active.value.filter((n) => n.position === position),
  })),
)
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      v-for="stack in stacks"
      :key="stack.position"
      tag="div"
      name="toast"
      class="toast-stack"
      :class="`is-${stack.position}`"
    >
      <div
        v-for="toast in stack.items"
        :key="toast.id"
        class="toast-wrapper"
        :class="`anim-${toast.animation}`"
      >
        <ToastItem
          :config="toast"
          :progress="
            toast.duration > 0 ? { mode: 'countdown', durationMs: toast.duration } : undefined
          "
          @close="store.dismiss(toast.id)"
        />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped lang="scss">
.toast-stack {
  position: fixed;
  z-index: var(--z-toast);
  // empty stacks must not block clicks; toasts re-enable pointer events
  pointer-events: none;
  display: flex;
  // column-reverse renders the last (newest) toast on top of the stack
  flex-direction: column-reverse;
  gap: var(--space-3);
  padding: var(--space-4);
  max-width: min(92vw, 380px);

  // align toasts to their anchored side
  &.is-top-left,
  &.is-bottom-left {
    left: 0;
    align-items: flex-start;
    // slide animation direction for this side (animate.css keyframe names)
    --slide-in: slideInLeft;
    --slide-out: slideOutLeft;
  }

  &.is-top-right,
  &.is-bottom-right {
    right: 0;
    align-items: flex-end;
    --slide-in: slideInRight;
    --slide-out: slideOutRight;
  }

  &.is-top-left,
  &.is-top-right {
    top: 0;
  }

  &.is-bottom-left,
  &.is-bottom-right {
    bottom: 0;
  }
}

.toast-wrapper {
  pointer-events: auto;
}

// existing toasts glide to their new slot when the stack changes
.toast-move {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

// animate.css keyframes, picked per toast via its anim-* class. A running CSS
// animation outranks the inline FLIP transform Vue applies, so no !important.
.anim-fade.toast-enter-active {
  animation: fadeIn 0.3s both;
}
.anim-fade.toast-leave-active {
  animation: fadeOut 0.3s both;
}

.anim-slide.toast-enter-active {
  animation: var(--slide-in) 0.4s both;
}
.anim-slide.toast-leave-active {
  animation: var(--slide-out) 0.4s both;
}

.anim-bounce.toast-enter-active {
  animation: bounceIn 0.5s both;
}
.anim-bounce.toast-leave-active {
  animation: bounceOut 0.5s both;
}
</style>
