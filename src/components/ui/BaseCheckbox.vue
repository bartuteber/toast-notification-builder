<script setup lang="ts">
defineProps<{ label: string }>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="checkbox">
    <input type="checkbox" v-model="model" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-sm);
  cursor: pointer;

  input {
    accent-color: var(--color-primary);
  }
}
</style>
