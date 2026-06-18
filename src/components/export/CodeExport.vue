<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.css'
import { useConfigStore } from '@/stores/useConfigStore'

hljs.registerLanguage('javascript', javascript)

const configStore = useConfigStore()

// Build a runnable config snippet from the current draft. Duration is emitted in
// ms (0 = persistent) to match the NotificationConfig contract.
const code = computed(() => {
  const durationMs = configStore.duration === 0 ? 0 : configStore.duration * 1000

  const fields: Record<string, string | number | boolean> = {
    type: configStore.type,
    title: configStore.title,
    message: configStore.message,
    duration: durationMs,
    position: configStore.position,
    backgroundColor: configStore.backgroundColor,
    textColor: configStore.textColor,
    showIcon: configStore.showIcon,
    icon: configStore.icon,
    showCloseButton: configStore.showCloseButton,
    animation: configStore.animation,
  }

  const body = Object.entries(fields)
    .map(([key, value]) => `  ${key}: ${typeof value === 'string' ? `'${value}'` : value},`)
    .join('\n')

  return `const notification = {\n${body}\n}`
})

const highlighted = computed(() => hljs.highlight(code.value, { language: 'javascript' }).value)

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="export">
    <h3 class="export-title">Code Export</h3>

    <div class="export-wrap">
      <button class="export-copy" type="button" @click="copy">
        <Icon v-if="copied" icon="mdi:check" />
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
      <pre class="export-code"><code class="hljs" v-html="highlighted"></code></pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.export {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.export-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 600;
}

.export-wrap {
  position: relative;
}

.export-copy {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: var(--z-raised);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-sm);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  color: #e4e4e7;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
}

.export-code {
  margin: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;

  :deep(.hljs) {
    padding: var(--space-4);
    font-size: var(--font-sm);
    overflow-x: auto;
  }
}
</style>
