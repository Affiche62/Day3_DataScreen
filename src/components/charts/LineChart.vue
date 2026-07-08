<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { DiskHourly } from '@/types/dashboard'

const props = defineProps<{ data: DiskHourly[]; title?: string }>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)

  const disks = ['sda', 'sdb', 'sdc', 'sdd', 'sde'] as const
  const colors = ['#00d4ff', '#00ff88', '#f59e0b', '#a855f7', '#ff6b35']
  const names = ['磁盘A', '磁盘B', '磁盘C', '磁盘D', '磁盘E']

  const series = disks.map((disk, i) => ({
    name: names[i],
    type: 'line' as const,
    data: props.data.map((d) => d[disk]),
    smooth: true,
    symbol: 'none',
    lineStyle: { width: 2, color: colors[i] },
    itemStyle: { color: colors[i] },
    connectNulls: true,
  }))

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 15, 36, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    legend: {
      data: names,
      bottom: 0,
      textStyle: { color: '#8090b0', fontSize: 10 },
      itemWidth: 12,
      itemHeight: 6,
    },
    grid: { left: '3%', right: '4%', top: '8%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: props.data.map((d) => d.hour.slice(5)),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.15)' } },
      axisLabel: { color: '#8090b0', fontSize: 9, rotate: 45, interval: 4 },
    },
    yAxis: {
      type: 'value',
      max: 100,
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
      axisLabel: { color: '#8090b0', fontSize: 10, formatter: '{value}%' },
      axisLine: { show: false },
    },
    series,
  }, true)
}

onMounted(() => renderChart())
watch(() => props.data, () => renderChart(), { deep: true })
const onResize = () => chart?.resize()
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => { window.removeEventListener('resize', onResize); chart?.dispose() })
</script>

<template>
  <div ref="chartRef" style="width:100%;height:100%" />
</template>
