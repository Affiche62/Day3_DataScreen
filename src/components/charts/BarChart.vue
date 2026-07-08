<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { DiskIOHourly } from '@/types/dashboard'

const props = defineProps<{ data: DiskIOHourly[] }>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)

  const colors = ['#00d4ff', '#0088cc', '#00ff88', '#00aa55', '#f59e0b', '#bb7700', '#a855f7', '#7a30cc', '#ff6b35', '#cc4422']

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 15, 36, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
      formatter: (params: any) => {
        let html = `<div style="font-weight:bold;margin-bottom:4px">${params[0].axisValue}</div>`
        for (const p of params) {
          if (p.value > 0) html += `<div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>${p.seriesName}: ${(p.value / 1000).toFixed(0)}K</div>`
        }
        return html
      },
    },
    legend: {
      data: ['磁盘A读', '磁盘A写', '磁盘B读', '磁盘B写', '磁盘C读', '磁盘C写', '磁盘D读', '磁盘D写', '磁盘E读', '磁盘E写'],
      bottom: 0,
      textStyle: { color: '#8090b0', fontSize: 8 },
      itemWidth: 8,
      itemHeight: 5,
      type: 'scroll',
    },
    grid: { left: '3%', right: '4%', top: '8%', bottom: '14%', containLabel: true },
    xAxis: {
      type: 'category',
      data: props.data.map((d) => d.hour.slice(5)),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.15)' } },
      axisLabel: { color: '#8090b0', fontSize: 9, rotate: 45, interval: 4 },
    },
    yAxis: {
      type: 'value',
      name: '扇区',
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
      axisLabel: { color: '#8090b0', fontSize: 10, formatter: (v: number) => (v / 1000).toFixed(0) + 'K' },
      axisLine: { show: false },
    },
    series: [
      { name: '磁盘A读', type: 'bar', stack: 'sda', data: props.data.map((d) => d.sda_read), itemStyle: { color: colors[0] }, barWidth: '60%' },
      { name: '磁盘A写', type: 'bar', stack: 'sda', data: props.data.map((d) => d.sda_write), itemStyle: { color: colors[1] }, barWidth: '60%' },
      { name: '磁盘B读', type: 'bar', stack: 'sdb', data: props.data.map((d) => d.sdb_read), itemStyle: { color: colors[2] }, barWidth: '60%' },
      { name: '磁盘B写', type: 'bar', stack: 'sdb', data: props.data.map((d) => d.sdb_write), itemStyle: { color: colors[3] }, barWidth: '60%' },
      { name: '磁盘C读', type: 'bar', stack: 'sdc', data: props.data.map((d) => d.sdc_read), itemStyle: { color: colors[4] }, barWidth: '60%' },
      { name: '磁盘C写', type: 'bar', stack: 'sdc', data: props.data.map((d) => d.sdc_write), itemStyle: { color: colors[5] }, barWidth: '60%' },
      { name: '磁盘D读', type: 'bar', stack: 'sdd', data: props.data.map((d) => d.sdd_read), itemStyle: { color: colors[6] }, barWidth: '60%' },
      { name: '磁盘D写', type: 'bar', stack: 'sdd', data: props.data.map((d) => d.sdd_write), itemStyle: { color: colors[7] }, barWidth: '60%' },
      { name: '磁盘E读', type: 'bar', stack: 'sde', data: props.data.map((d) => d.sde_read), itemStyle: { color: colors[8] }, barWidth: '60%' },
      { name: '磁盘E写', type: 'bar', stack: 'sde', data: props.data.map((d) => d.sde_write), itemStyle: { color: colors[9] }, barWidth: '60%' },
    ],
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
