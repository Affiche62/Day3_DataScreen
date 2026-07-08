<script setup lang="ts">
defineProps<{
  title: string
  value: string
  subtitle?: string
  color?: string
}>()
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-title">{{ title }}</div>
    <div class="kpi-value" :style="{ color: color || '#fff' }">{{ value }}</div>
    <div v-if="subtitle" class="kpi-subtitle">{{ subtitle }}</div>
  </div>
</template>

<style scoped lang="scss">
.kpi-card {
  background: rgba(16, 24, 48, 0.6);
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
  }
}

.kpi-title {
  font-size: 13px;
  color: $color-text-dim;
}

.kpi-value {
  font-size: 22px;
  font-weight: bold;
  font-family: $font-title;
  white-space: nowrap;
}

.kpi-subtitle {
  font-size: 11px;
  color: $color-text-dim;
}
</style>
