<script setup lang="ts">
import { computed } from 'vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import BaseTextField from '@/components/ui/BaseTextField.vue'
import BaseTextArea from '@/components/ui/BaseTextArea.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import ColorField from '@/components/ui/ColorField.vue'
import {
  ANIMATION_OPTIONS,
  POSITION_OPTIONS,
  TYPE_OPTIONS,
} from '@/lib/options.ts'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/useConfigStore.ts'

const configStore = useConfigStore()
const {
  title,
  message,
  duration,
  position,
  backgroundColor,
  textColor,
  showIcon,
  showCloseButton,
  animation,
} = storeToRefs(configStore)

// setType also applies the type's default background, so bridge it via computed.
const type = computed({
  get: () => configStore.type,
  set: (value) => configStore.setType(value),
})

const persistent = computed({
  get: () => configStore.isPersistent,
  set: (value) => configStore.setPersistent(value),
})
</script>

<template>
  <div class="config">
    <SegmentedControl
      v-model:selected="type"
      :options="TYPE_OPTIONS"
      label="Type"
      :columns="4"
      :active-color="backgroundColor"
    />

    <BaseTextField v-model="title" label="Title" />

    <BaseTextArea v-model="message" label="Message" :rows="3" />

    <!-- Duration: native range is enough; no need to wrap it. -->
    <div class="field">
      <label class="field-label" for="cfg-duration">Duration</label>
      <div class="slider-row">
        <input
          id="cfg-duration"
          class="slider"
          type="range"
          min="1"
          max="10"
          :disabled="persistent"
          v-model.number="duration"
        />
        <span class="slider-row-value">{{ persistent ? '∞' : duration + 's' }}</span>
      </div>
      <BaseCheckbox v-model="persistent" label="Persistent (no auto-dismiss)" />
    </div>

    <SegmentedControl
      v-model:selected="position"
      :options="POSITION_OPTIONS"
      label="Position"
      :columns="2"
    />

    <hr class="divider" />

    <div class="field">
      <span class="field-label is-section">Style</span>
      <div class="style-grid">
        <ColorField v-model="backgroundColor" label="Background" />
        <ColorField v-model="textColor" label="Text Color" />
      </div>
    </div>

    <div class="field">
      <span class="field-label">Options</span>
      <div class="options-row">
        <BaseCheckbox v-model="showIcon" label="Show Icon" />
        <BaseCheckbox v-model="showCloseButton" label="Show Close Button" />
      </div>
    </div>

    <SegmentedControl
      v-model:selected="animation"
      :options="ANIMATION_OPTIONS"
      label="Animation"
      :columns="3"
    />
  </div>
</template>

<style scoped lang="scss">
.config {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field-label {
  font-size: var(--font-sm);
  font-weight: 600;

  &.is-section {
    font-size: var(--font-md);
  }
}

.slider-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  &-value {
    min-width: 2.5ch;
    text-align: right;
    color: var(--color-text-muted);
    font-variant-numeric: tabular-nums;
  }
}

.slider {
  flex: 1;
  accent-color: var(--color-primary);
}

.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0;
}

.style-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.options-row {
  display: flex;
  gap: var(--space-5);
}
</style>
