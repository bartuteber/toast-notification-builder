<script setup lang="ts">
import { useId } from 'vue';

const model = defineModel<string>({ required: true });

withDefaults(
  defineProps<{
    label?: string;
    rows?: number;
  }>(),
  { rows: 3 },
);

const inputId = useId();
</script>

<template>
  <div class="field">
    <label v-if="label" :for="inputId" class="field-label">{{ label }}</label>
    <textarea
      :id="inputId"
      class="input textarea"
      :rows="rows"
      v-model="model"
    ></textarea>
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

.textarea {
  resize: vertical;
  min-height: 72px;
  font-family: inherit;
}
</style>
