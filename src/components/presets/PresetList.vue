<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePresetStore } from '@/stores/usePresetStore'
import { useConfigStore } from '@/stores/useConfigStore'
import type { Preset } from '@/types/notification'

const presetStore = usePresetStore()
const configStore = useConfigStore()
const { presets } = storeToRefs(presetStore)

const name = ref('')

function save() {
  const trimmed = name.value.trim()
  if (!trimmed) return
  presetStore.save(trimmed, configStore.$state)
  name.value = ''
}

function load(preset: Preset) {
  configStore.setConfig(preset.config)
}

function summary(preset: Preset): string {
  const { duration, position } = preset.config
  const time = duration === 0 ? 'Persistent' : `${duration}s`
  const label = position
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  return `${time} · ${label}`
}
</script>

<template>
  <div class="presets">
    <h3 class="presets-title">Saved Presets</h3>

    <p v-if="presets.length === 0" class="presets-empty">
      No presets yet — configure a toast and save it below.
    </p>

    <ul v-else class="presets-list">
      <li v-for="preset in presets" :key="preset.id" class="preset">
        <span
          class="preset-dot"
          :style="{ background: preset.config.backgroundColor }"
        />
        <div class="preset-info">
          <span class="preset-name">{{ preset.name }}</span>
          <span class="preset-summary">{{ summary(preset) }}</span>
        </div>
        <div class="preset-actions">
          <BaseButton variant="ghost" size="sm" @click="load(preset)">
            Load
          </BaseButton>
          <BaseButton
            variant="ghost"
            size="sm"
            @click="presetStore.remove(preset.id)"
          >
            Delete
          </BaseButton>
        </div>
      </li>
    </ul>

    <div class="preset-save">
      <input
        v-model="name"
        class="preset-input"
        type="text"
        placeholder="Preset name..."
        @keyup.enter="save"
      />
      <BaseButton @click="save">Save</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.presets {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.presets-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 600;
}

.presets-empty {
  margin: 0;
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.presets-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.preset {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-2);
}

.preset-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.preset-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.preset-name {
  font-weight: 600;
  font-size: var(--font-sm);
}

.preset-summary {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.preset-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}

.preset-save {
  display: flex;
  gap: var(--space-2);
}

.preset-input {
  flex: 1;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }
}
</style>
