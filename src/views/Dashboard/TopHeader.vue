<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} 星期${['日','一','二','三','四','五','六'][date.getDay()]}`
}
function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`
}

onMounted(() => { timer = setInterval(() => now.value = new Date(), 1000) })
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="top-header">
    <div class="header-left">
      <span class="project-name">数据中心监控平台</span>
      <span class="project-date">{{ formatDate(now) }}</span>
    </div>
    <div class="header-center">
      <h1 class="main-title">数据中心性能监控大屏</h1>
    </div>
    <div class="header-right">
      <div class="time-display">
        <span class="time-label">当前时间</span>
        <span class="time-value">{{ formatTime(now) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 24px;
  background: linear-gradient(180deg, rgba(0,40,80,0.4) 0%, transparent 100%);
  position: relative;
  flex-shrink: 0;
}
.header-left { display: flex; flex-direction: column; gap: 2px; }
.project-name { font-size: 13px; color: $color-text-dim; }
.project-date { font-size: 12px; color: $color-text-dim; }
.header-center { position: absolute; left: 50%; transform: translateX(-50%); }
.main-title {
  font-size: 34px; font-family: $font-title; font-weight: bold;
  background: linear-gradient(90deg, $color-primary, $color-success);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; letter-spacing: 4px; white-space: nowrap;
}
.header-right { display: flex; align-items: center; }
.time-display { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.time-label { font-size: 11px; color: $color-text-dim; }
.time-value { font-size: 22px; font-weight: bold; color: $color-primary; font-family: 'Courier New', monospace; letter-spacing: 2px; }
</style>
