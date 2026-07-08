<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface PieData {
  name: string
  value: number
}

const props = defineProps<{ data: PieData[]; title?: string }>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

const colors = ['#00d4ff', '#00ff88', '#f59e0b', '#a855f7', '#ff6b35', '#ff4488', '#44aaff', '#88ff44', '#ff8844', '#aa44ff']

function renderChart() {
  if (!chartRef.value || !props.data.length) return
  if (!chart) chart = echarts.init(chartRef.value)

  chart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 15, 36, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
      formatter: '{b}: {c}台 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#8090b0', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 6,
    },
    series: [{
      type: 'pie',
      radius: ['42%', '70%'],
      center: ['38%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a0f24',
        borderWidth: 2,
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' },
      },
      data: props.data.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } })),
    }],
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
