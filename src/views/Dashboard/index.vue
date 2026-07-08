<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useScreenScale } from '@/hooks/useScreenScale'
import TopHeader from './TopHeader.vue'
import LeftPanel from './LeftPanel.vue'
import CenterPanel from './CenterPanel.vue'
import RightPanel from './RightPanel.vue'
import BottomPanel from './BottomPanel.vue'
import KpiCard from '@/components/common/KpiCard.vue'
import { storeToRefs } from 'pinia'

const store = useDashboardStore()
const { kpiSummary } = storeToRefs(store)
const containerRef = ref<HTMLElement | null>(null)
useScreenScale(containerRef)

let pollTimer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await store.fetchAllData()
  pollTimer = setInterval(() => store.fetchAllData(), 60000)
})

onUnmounted(() => { if (pollTimer) clearInterval(pollTimer) })
</script>

<template>
  <div ref="containerRef" class="dashboard">
    <TopHeader />

    <div v-if="kpiSummary" class="kpi-row">
      <KpiCard title="监控主机数" :value="String(kpiSummary.total_hosts)" subtitle="台服务器" color="#00d4ff" />
      <KpiCard title="磁盘记录数" :value="'1.2万'" subtitle="条disk数据" color="#00ff88" />
      <KpiCard title="平均磁盘利用率" :value="kpiSummary.disk_util.value.toFixed(1) + '%'" :subtitle="'峰值 ' + kpiSummary.disk_util.max.toFixed(1) + '%'" color="#f59e0b" />
      <KpiCard title="平均IO延迟" :value="kpiSummary.disk_latency.value.toFixed(1) + 'ms'" :subtitle="'最大 ' + kpiSummary.disk_latency.max.toFixed(1) + 'ms'" color="#a855f7" />
      <KpiCard title="平均CPU使用率" :value="kpiSummary.cpu.value.toFixed(1) + '%'" :subtitle="'峰值 ' + kpiSummary.cpu.max.toFixed(1) + '%'" color="#ff6b35" />
      <KpiCard title="告警总数" :value="String(kpiSummary.alert_count)" subtitle="条高利用率/高延迟告警" color="#ff4444" />
    </div>

    <div class="main-grid">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>

    <BottomPanel />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  width: 1920px;
  height: 1080px;
  padding: 0 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: $gap;
  height: 110px;
  flex-shrink: 0;
}

.main-grid {
  display: grid;
  grid-template-columns: 28% 44% 28%;
  gap: $gap;
  flex: 1;
  min-height: 0;
}
</style>
