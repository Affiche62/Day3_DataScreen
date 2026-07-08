<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import ScrollTable from '@/components/common/ScrollTable.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { computed } from 'vue'

const store = useDashboardStore()
const { modelStats, locationStats, hostSummary, alerts } = storeToRefs(store)

const modelPieData = computed(() =>
  (modelStats.value || []).map((m) => ({ name: m.model, value: m.count }))
)
</script>

<template>
  <div class="right-panel">
    <ChartWrapper title="服务器型号分布" class="pie-block">
      <PieChart :data="modelPieData" />
    </ChartWrapper>
    <ChartWrapper title="告警信息 (高利用率 > 90% / 高延迟 > 40ms)" class="alert-block">
      <ScrollTable :data="alerts" />
    </ChartWrapper>
    <ChartWrapper title="机房分布统计" class="loc-block">
      <div class="loc-grid" v-if="locationStats.length">
        <div v-for="loc in locationStats" :key="loc.location" class="loc-item">
          <div class="loc-name">{{ loc.location }}</div>
          <div class="loc-count">{{ loc.count }}<span class="loc-unit">台</span></div>
        </div>
      </div>
    </ChartWrapper>
  </div>
</template>

<style scoped lang="scss">
.right-panel { display: flex; flex-direction: column; gap: $gap; min-height: 0; }
.pie-block { flex: 3; min-height: 0; }
.alert-block { flex: 4; min-height: 0; }
.loc-block { flex: 1.5; min-height: 0; }

.loc-grid {
  display: flex; flex-wrap: wrap; gap: 8px; padding: 8px; justify-content: center;
}
.loc-item {
  background: rgba(0,212,255,0.06); border: 1px solid $border-color;
  border-radius: 4px; padding: 8px 14px; text-align: center; min-width: 80px;
}
.loc-name { font-size: 12px; color: $color-text; margin-bottom: 4px; }
.loc-count { font-size: 20px; font-weight: bold; color: $color-primary; font-family: $font-title; }
.loc-unit { font-size: 12px; font-weight: normal; color: $color-text-dim; margin-left: 2px; }
</style>
