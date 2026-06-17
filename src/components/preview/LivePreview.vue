<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastItem from '@/components/toast/ToastItem.vue'
import { useConfigStore } from '@/stores/useConfigStore'
import type { ToastVisual } from '@/types/notification'

const configStore = useConfigStore()
const { position } = storeToRefs(configStore)

// Explicit visual projection: reactive, exactly ToastVisual, and never hands the
// child a reference to the store's internal state.
const toastConfig = computed<ToastVisual>(() => ({
  type: configStore.type,
  title: configStore.title,
  message: configStore.message,
  backgroundColor: configStore.backgroundColor,
  textColor: configStore.textColor,
  showIcon: configStore.showIcon,
  showCloseButton: configStore.showCloseButton,
}))
</script>

<template>
  <div class="preview-stage">
    <div class="preview-toast" :class="`is-${position}`">
      <ToastItem :config="toastConfig" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-stage {
  position: relative;
  min-height: 280px;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface-2);
  overflow: hidden;
}

.preview-toast {
  position: absolute;

  &.is-top-left {
    top: var(--space-4);
    left: var(--space-4);
  }

  &.is-top-right {
    top: var(--space-4);
    right: var(--space-4);
  }

  &.is-bottom-left {
    bottom: var(--space-4);
    left: var(--space-4);
  }

  &.is-bottom-right {
    bottom: var(--space-4);
    right: var(--space-4);
  }
}
</style>
