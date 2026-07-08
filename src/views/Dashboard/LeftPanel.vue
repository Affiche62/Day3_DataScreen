<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import LineChart from '@/components/charts/LineChart.vue'

const store = useDashboardStore()
const { diskUtilHourly, diskLatencyHourly } = storeToRefs(store)
</script>

<template>
  <div class="left-panel">
    <ChartWrapper title="磁盘利用率趋势 (各磁盘小时均值)" class="chart-block">
      <LineChart :data="diskUtilHourly" />
    </ChartWrapper>
    <ChartWrapper title="磁盘 IO 延迟趋势 (各磁盘小时均值)" class="chart-block">
      <LineChart :data="diskLatencyHourly" />
    </ChartWrapper>
  </div>
</template>

<style scoped lang="scss">
.left-panel { display: flex; flex-direction: column; gap: $gap; min-height: 0; }
.chart-block { flex: 1; min-height: 0; }
</style>
