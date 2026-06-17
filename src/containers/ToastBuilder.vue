<script setup lang="ts">
// Screen-level container. Owns layout and (later) orchestrates the stores:
// config draft -> live preview, preset load/save, and the active-toast overlay.
// Child components are introduced phase by phase.
import ConfigPanel from '@/components/config/ConfigPanel.vue'
import LivePreview from '@/components/preview/LivePreview.vue'
import PresetList from '@/components/presets/PresetList.vue'
import CodeExport from '@/components/export/CodeExport.vue'
import ToastContainer from '@/components/toast/ToastContainer.vue'
</script>

<template>
  <div class="builder">
    <div class="app-bar">
      <header class="builder-header">
        <h1 class="builder-title">Toast Notification Builder</h1>
      </header>
    </div>
    <main class="builder-main">
      <!-- Left: everything the user configures -->
      <section class="panel">
        <h2 class="panel-title">Configuration</h2>
        <ConfigPanel />
      </section>

      <!-- Right: live preview, trigger, presets, code export -->
      <section class="panel">
        <h2 class="panel-title">Preview</h2>
        <LivePreview />
        <PresetList />
        <CodeExport />
      </section>
    </main>

    <!-- Fixed overlay, position-aware stacking, teleported to body -->
    <ToastContainer />
  </div>
</template>

<style scoped lang="scss">
.builder {
  --app-bar-height: 64px;

  & .app-bar {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    height: var(--app-bar-height);
  }
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  padding-top: var(--app-bar-height);

  &-header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-4) var(--space-6);
  }

  &-title {
    margin: 0;
    font-size: var(--font-lg);
    font-weight: 700;
  }

  &-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-6);
  }
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  height: calc(100vh - (var(--app-bar-height) + var(--space-6) * 2));
  overflow-y: auto;

  &-title {
    margin: 0;
    font-size: var(--font-md);
    font-weight: 600;
  }
}

@media (max-width: 860px) {
  .builder-main {
    grid-template-columns: 1fr;
  }
}
</style>
