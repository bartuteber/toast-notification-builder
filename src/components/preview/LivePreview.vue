<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastItem from '@/components/toast/ToastItem.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useConfigStore } from '@/stores/useConfigStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { ToastVisual } from '@/types/notification'

const configStore = useConfigStore()
const notificationStore = useNotificationStore()
const { position } = storeToRefs(configStore)

// Snapshot the current draft into a live toast. `show` spreads it, so later
// config edits never mutate notifications already on screen.
function showNotification() {
  notificationStore.show(configStore.$state)
}

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
  <div class="preview">
    <div class="preview-stage">
      <div class="preview-toast" :class="`is-${position}`">
        <ToastItem :config="toastConfig" />
      </div>
    </div>

    <BaseButton block @click="showNotification">Show Notification</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

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
