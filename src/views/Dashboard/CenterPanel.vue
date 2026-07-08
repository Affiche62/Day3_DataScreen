<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import BarChart from '@/components/charts/BarChart.vue'
import * as echarts from 'echarts'
import type { CpuTrendItem, LoadTrendItem } from '@/types/dashboard'

const store = useDashboardStore()
const { diskIOHourly, cpuTrend, loadTrend } = storeToRefs(store)

const cpuChartRef = ref<HTMLElement | null>(null)
let cpuChart: echarts.ECharts | null = null

function renderCpuChart() {
  if (!cpuChartRef.value || !cpuTrend.value.length) return
  if (!cpuChart) cpuChart = echarts.init(cpuChartRef.value)

  const cdata = cpuTrend.value
  cpuChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 15, 36, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 11 },
    },
    legend: { bottom: 0, textStyle: { color: '#8090b0', fontSize: 10 }, itemWidth: 12, itemHeight: 6 },
    grid: { left: '3%', right: '4%', top: '8%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: cdata.map((d) => d.hour.slice(5)),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.15)' } },
      axisLabel: { color: '#8090b0', fontSize: 9, rotate: 45, interval: 6 },
    },
    yAxis: {
      type: 'value', max: 100,
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
      axisLabel: { color: '#8090b0', fontSize: 10, formatter: '{value}%' },
      axisLine: { show: false },
    },
    series: [
      { name: 'CPU使用率', type: 'line', data: cdata.map((d) => d.cpu_usage), smooth: true, symbol: 'none', lineStyle: { width: 2, color: '#ff6b35' }, itemStyle: { color: '#ff6b35' } },
      { name: 'CPU用户态', type: 'line', data: cdata.map((d) => d.cpu_user), smooth: true, symbol: 'none', lineStyle: { width: 1.5, color: '#00d4ff' }, itemStyle: { color: '#00d4ff' } },
      { name: 'CPU系统态', type: 'line', data: cdata.map((d) => d.cpu_sys), smooth: true, symbol: 'none', lineStyle: { width: 1.5, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' } },
      { name: 'CPU等待', type: 'line', data: cdata.map((d) => d.cpu_wait), smooth: true, symbol: 'none', lineStyle: { width: 1.5, color: '#a855f7' }, itemStyle: { color: '#a855f7' } },
    ],
  }, true)
}

onMounted(() => {
  setTimeout(renderCpuChart, 300)
})
watch(() => cpuTrend.value, () => renderCpuChart(), { deep: true })
const onResize2 = () => cpuChart?.resize()
onMounted(() => window.addEventListener('resize', onResize2))
onUnmounted(() => { window.removeEventListener('resize', onResize2); cpuChart?.dispose() })
</script>

<template>
  <div class="center-panel">
    <ChartWrapper title="磁盘读写扇区趋势 (各磁盘堆叠)" class="io-block">
      <BarChart :data="diskIOHourly" />
    </ChartWrapper>
    <ChartWrapper title="CPU 使用率趋势 (各内核态小时均值)" class="cpu-block">
      <div ref="cpuChartRef" style="width:100%;height:100%" />
    </ChartWrapper>
    <div class="info-stream">
      <div class="info-title">系统负载趋势</div>
      <div class="load-bars" v-if="loadTrend.length">
        <div class="load-item" v-for="(item, idx) in loadTrend.slice(-24)" :key="idx">
          <span class="load-tick">{{ item.hour.slice(5) }}</span>
          <span class="load-bar-wrap">
            <span class="load-bar" :style="{ width: ((item.load1 ?? 0) / 20 * 100) + '%', background: '#00d4ff' }"></span>
          </span>
          <span class="load-val">{{ item.load1?.toFixed(1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center-panel { display: flex; flex-direction: column; gap: $gap; min-height: 0; }
.io-block { flex: 4; min-height: 0; }
.cpu-block { flex: 3; min-height: 0; }

.info-stream {
  background: $bg-panel; border: 1px solid $border-color;
  border-radius: 4px; padding: 6px 10px; height: 130px; overflow: hidden;
}
.info-title { font-size: 11px; color: $color-primary; margin-bottom: 4px; font-family: $font-title; }
.load-bars { display: flex; flex-direction: column; gap: 2px; }
.load-item { display: flex; align-items: center; gap: 6px; font-size: 10px; }
.load-tick { color: $color-text-dim; width: 70px; flex-shrink: 0; }
.load-bar-wrap { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
.load-bar { height: 100%; border-radius: 3px; min-width: 2px; transition: width 0.5s; }
.load-val { color: $color-primary; width: 36px; text-align: right; flex-shrink: 0; }
</style>
