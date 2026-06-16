<script setup lang="ts">
import { useId } from 'vue'

const model = defineModel<string>({ required: true })

defineProps<{
  label?: string
}>()

const inputId = useId()
</script>

<template>
  <div class="field">
    <label v-if="label" :for="inputId" class="field-label">{{ label }}</label>
    <div class="color-field">
      <input class="color-field-swatch" type="color" v-model="model" />
      <input :id="inputId" class="input" type="text" v-model="model" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field-label {
  font-size: var(--font-sm);
  font-weight: 600;
}

.color-field {
  display: flex;
  align-items: center;
  gap: var(--space-2);

  &-swatch {
    width: 38px;
    height: 38px;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: none;
    cursor: pointer;
    flex-shrink: 0;

    &::-webkit-color-swatch-wrapper {
      padding: 2px;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 4px;
    }
  }
}

.input {
  width: 100%;
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
