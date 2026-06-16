<script setup lang="ts">
import { ref } from 'vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import BaseTextField from '../ui/BaseTextField.vue'
import BaseTextArea from '../ui/BaseTextArea.vue'
import BaseCheckbox from '../ui/BaseCheckbox.vue'
import ColorField from '../ui/ColorField.vue'

// Local state for now — replaced by useConfigStore once the domain layer lands.
// Unions are inlined temporarily; they move to types/notification.ts in Phase 1.
type TypeValue = 'success' | 'error' | 'warning' | 'info'
type PositionValue = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type AnimationValue = 'fade' | 'slide' | 'bounce'

const type = ref<TypeValue>('success')
const title = ref('Success!')
const message = ref('Your changes have been saved successfully.')
const duration = ref(3)
const persistent = ref(false)
const position = ref<PositionValue>('top-left')
const backgroundColor = ref('#22c55e')
const textColor = ref('#FFFFFF')
const showIcon = ref(true)
const showCloseButton = ref(true)
const animation = ref<AnimationValue>('slide')

// `satisfies` keeps the literal value types while checking option shape.
const TYPE_OPTIONS = [
  { value: 'success', label: 'Success', icon: '✓' },
  { value: 'error', label: 'Error', icon: '✕' },
  { value: 'warning', label: 'Warning', icon: '⚠' },
  { value: 'info', label: 'Info', icon: 'ℹ' },
] satisfies { value: TypeValue; label: string; icon: string }[]

const POSITION_OPTIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
] satisfies { value: PositionValue; label: string }[]

const ANIMATION_OPTIONS = [
  { value: 'fade', label: 'Fade' },
  { value: 'slide', label: 'Slide' },
  { value: 'bounce', label: 'Bounce' },
] satisfies { value: AnimationValue; label: string }[]
</script>

<template>
  <div class="config">
    <SegmentedControl v-model="type" :options="TYPE_OPTIONS" label="Type" :columns="4" />

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
      v-model="position"
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
      v-model="animation"
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
