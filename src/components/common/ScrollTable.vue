<script setup lang="ts">
import { computed } from 'vue'
import type { AlertItem } from '@/types/dashboard'

const props = defineProps<{
  data: AlertItem[]
}>()

const doubledData = computed(() => [...props.data, ...props.data])

function getTagStr(mod: string): string {
  if (mod.includes('util')) return '利用率'
  if (mod.includes('await') || mod.includes('svctm')) return '延迟'
  return '指标'
}
</script>

<template>
  <div class="scroll-table">
    <div class="table-header">
      <span class="col-time">时间</span>
      <span class="col-host">主机</span>
      <span class="col-metric">指标</span>
      <span class="col-value">值</span>
      <span class="col-type">类型</span>
    </div>
    <div class="table-viewport">
      <div class="table-body">
        <div v-for="(item, idx) in doubledData" :key="idx" class="table-row">
          <span class="col-time">{{ item.ts.slice(5) }}</span>
          <span class="col-host">{{ item.hostid }}</span>
          <span class="col-metric">{{ item.mod }}</span>
          <span class="col-value">{{ item.value.toFixed(2) }}</span>
          <span class="col-type" :class="item.type.includes('高利用率') ? 'type-danger' : 'type-warn'">{{ item.type }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-table {
  font-size: 11px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.table-header {
  display: flex;
  padding: 5px 8px;
  color: $color-text-dim;
  font-size: 10px;
  border-bottom: 1px solid $border-color;
  flex-shrink: 0;
  background: rgba(16, 24, 48, 0.95);
  z-index: 2;
}

.table-viewport { flex: 1; overflow: hidden; }

.table-body {
  animation: scroll-up 30s linear infinite;
  &:hover { animation-play-state: paused; }
}

.table-row {
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.04);
}

.col-time { width: 22%; color: $color-text-dim; }
.col-host { width: 16%; color: $color-primary; }
.col-metric { width: 28%; color: $color-text; }
.col-value { width: 16%; font-weight: bold; color: $color-yellow; }
.col-type { width: 18%; font-size: 10px; }

.type-danger { color: $color-danger; }
.type-warn { color: $color-warning; }

@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
</style>
