<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <span class="chart-deco"></span>
      <span class="chart-title">{{ title }}</span>
    </div>
    <div class="chart-body">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-wrapper {
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid $border-color;
  flex-shrink: 0;
}

.chart-deco {
  width: 4px;
  height: 16px;
  background: linear-gradient(180deg, $color-primary, $color-purple);
  border-radius: 2px;
}

.chart-title {
  font-size: 14px;
  font-family: $font-title;
  color: $color-text;
  font-weight: 600;
}

.chart-body {
  flex: 1;
  min-height: 0;
  position: relative;
}
</style>
