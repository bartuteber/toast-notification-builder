<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastItem from '@/components/toast/ToastItem.vue'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { Position } from '@/types/notification'

const store = useNotificationStore()
const { active } = storeToRefs(store)

const POSITIONS: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

// Group by position so each corner stacks independently
// toasts pile up vertically.
const stacks = computed(() =>
  POSITIONS.map((position) => ({
    position,
    items: active.value.filter((n) => n.position === position),
  })).filter((stack) => stack.items.length > 0),
)
</script>

<template>
  <Teleport to="body">
    <div
      v-for="stack in stacks"
      :key="stack.position"
      class="toast-stack"
      :class="`is-${stack.position}`"
    >
      <ToastItem
        v-for="toast in stack.items"
        :key="toast.id"
        :config="toast"
        @close="store.dismiss(toast.id)"
      />
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.toast-stack {
  position: fixed;
  z-index: 1000;
  display: flex;
  // column-reverse renders the last (newest) toast on top of the stack
  flex-direction: column-reverse;
  gap: var(--space-3);
  padding: var(--space-4);
  max-width: min(92vw, 380px);

  &.is-top-left {
    top: 0;
    left: 0;
  }

  &.is-top-right {
    top: 0;
    right: 0;
  }

  &.is-bottom-left {
    bottom: 0;
    left: 0;
  }

  &.is-bottom-right {
    bottom: 0;
    right: 0;
  }
}
</style>
