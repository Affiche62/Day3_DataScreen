import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type {
  HostInfo, HostSummary, KpiSummary, DiskHourly, DiskIOHourly,
  CpuTrendItem, MemTrendItem, NetTrendItem, LoadTrendItem, AlertItem,
  ModelStat, LocationStat,
} from '@/types/dashboard'
import {
  fetchKpiSummary, fetchHosts, fetchHostSummary,
  fetchDiskUtilHourly, fetchDiskLatencyHourly, fetchDiskIOHourly,
  fetchCpuTrend, fetchMemTrend, fetchNetTrend, fetchLoadTrend,
  fetchAlerts, fetchModelStats, fetchLocationStats,
} from '@/services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const kpiSummary: Ref<KpiSummary | null> = ref(null)
  const hosts: Ref<HostInfo[]> = ref([])
  const hostSummary: Ref<HostSummary[]> = ref([])
  const diskUtilHourly: Ref<DiskHourly[]> = ref([])
  const diskLatencyHourly: Ref<DiskHourly[]> = ref([])
  const diskIOHourly: Ref<DiskIOHourly[]> = ref([])
  const cpuTrend: Ref<CpuTrendItem[]> = ref([])
  const memTrend: Ref<MemTrendItem[]> = ref([])
  const netTrend: Ref<NetTrendItem[]> = ref([])
  const loadTrend: Ref<LoadTrendItem[]> = ref([])
  const alerts: Ref<AlertItem[]> = ref([])
  const modelStats: Ref<ModelStat[]> = ref([])
  const locationStats: Ref<LocationStat[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAllData() {
    loading.value = true
    error.value = null
    try {
      const results = await Promise.all([
        fetchKpiSummary(),
        fetchHosts(),
        fetchHostSummary(),
        fetchDiskUtilHourly(),
        fetchDiskLatencyHourly(),
        fetchDiskIOHourly(),
        fetchCpuTrend(),
        fetchMemTrend(),
        fetchNetTrend(),
        fetchLoadTrend(),
        fetchAlerts(),
        fetchModelStats(),
        fetchLocationStats(),
      ])
      kpiSummary.value = results[0]
      hosts.value = results[1]
      hostSummary.value = results[2]
      diskUtilHourly.value = results[3]
      diskLatencyHourly.value = results[4]
      diskIOHourly.value = results[5]
      cpuTrend.value = results[6]
      memTrend.value = results[7]
      netTrend.value = results[8]
      loadTrend.value = results[9]
      alerts.value = results[10]
      modelStats.value = results[11]
      locationStats.value = results[12]
    } catch (e) {
      const msg = e instanceof Error ? e.message : '未知错误'
      error.value = msg
    } finally {
      loading.value = false
    }
  }

  return {
    kpiSummary, hosts, hostSummary,
    diskUtilHourly, diskLatencyHourly, diskIOHourly,
    cpuTrend, memTrend, netTrend, loadTrend,
    alerts, modelStats, locationStats,
    loading, error, fetchAllData,
  }
})
