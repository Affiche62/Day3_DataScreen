<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useDashboardStore()
const { hostSummary } = storeToRefs(store)

const hostList = computed(() => hostSummary.value || [])
</script>

<template>
  <div class="bottom-panel">
    <div class="bottom-header">
      <span class="bottom-title">主机监控总览</span>
      <span class="bottom-subtitle">共 {{ hostList.length }} 台服务器 · 20台主机 · 5类磁盘</span>
    </div>
    <div class="bottom-scroll">
      <div class="scroll-track">
        <div v-for="host in hostList" :key="host.hostid" class="host-card">
          <div class="host-header">
            <span class="host-name">{{ host.hostid }}</span>
            <span class="host-model">{{ host.model }}</span>
          </div>
          <div class="host-metrics">
            <div class="hm-item">
              <span class="hm-label">磁盘平均利用率</span>
              <span class="hm-value" :style="{ color: host.avg_disk_util > 70 ? '#ff6b35' : '#00ff88' }">{{ host.avg_disk_util.toFixed(1) }}%</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">峰值利用率</span>
              <span class="hm-value" :style="{ color: host.max_disk_util > 90 ? '#ff4444' : '#f59e0b' }">{{ host.max_disk_util.toFixed(1) }}%</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">平均延迟</span>
              <span class="hm-value" :style="{ color: host.avg_disk_latency > 30 ? '#ff6b35' : '#00d4ff' }">{{ host.avg_disk_latency.toFixed(1) }}ms</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">CPU使用率</span>
              <span class="hm-value">{{ host.avg_cpu.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="host-meta">
            <span>{{ host.owner }}</span>
            <span>{{ host.location }}</span>
          </div>
        </div>
        <!-- Duplicate for seamless scroll -->
        <div v-for="host in hostList" :key="'dup-'+host.hostid" class="host-card">
          <div class="host-header">
            <span class="host-name">{{ host.hostid }}</span>
            <span class="host-model">{{ host.model }}</span>
          </div>
          <div class="host-metrics">
            <div class="hm-item">
              <span class="hm-label">磁盘平均利用率</span>
              <span class="hm-value" :style="{ color: host.avg_disk_util > 70 ? '#ff6b35' : '#00ff88' }">{{ host.avg_disk_util.toFixed(1) }}%</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">峰值利用率</span>
              <span class="hm-value" :style="{ color: host.max_disk_util > 90 ? '#ff4444' : '#f59e0b' }">{{ host.max_disk_util.toFixed(1) }}%</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">平均延迟</span>
              <span class="hm-value" :style="{ color: host.avg_disk_latency > 30 ? '#ff6b35' : '#00d4ff' }">{{ host.avg_disk_latency.toFixed(1) }}ms</span>
            </div>
            <div class="hm-item">
              <span class="hm-label">CPU使用率</span>
              <span class="hm-value">{{ host.avg_cpu.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="host-meta">
            <span>{{ host.owner }}</span>
            <span>{{ host.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-panel {
  background: $bg-panel; border: 1px solid $border-color;
  border-radius: 4px; padding: 6px 12px 4px; overflow: hidden; flex-shrink: 0;
}
.bottom-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;
}
.bottom-title { font-size: 13px; color: $color-primary; font-family: $font-title; }
.bottom-subtitle { font-size: 11px; color: $color-text-dim; }

.bottom-scroll { overflow: hidden; }
.scroll-track {
  display: flex; gap: 10px;
  animation: scroll-horiz 60s linear infinite;
  &:hover { animation-play-state: paused; }
  width: max-content;
}

.host-card {
  background: rgba(0,212,255,0.04); border: 1px solid $border-color;
  border-radius: 4px; padding: 8px 12px; min-width: 200px; flex-shrink: 0;
}
.host-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.host-name { color: $color-primary; font-size: 13px; font-weight: bold; font-family: $font-title; }
.host-model { color: $color-text-dim; font-size: 10px; }

.host-metrics { display: flex; gap: 6px; margin-bottom: 4px; }
.hm-item { display: flex; flex-direction: column; flex: 1; }
.hm-label { font-size: 9px; color: $color-text-dim; }
.hm-value { font-size: 13px; font-weight: bold; color: $color-text; font-family: $font-title; }

.host-meta { display: flex; justify-content: space-between; font-size: 10px; color: $color-text-dim; }

@keyframes scroll-horiz {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
