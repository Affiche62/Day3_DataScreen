const BASE = '/data'

export async function fetchJson<T>(filename: string): Promise<T> {
  const res = await fetch(`${BASE}/${filename}`)
  if (!res.ok) throw new Error(`Failed to fetch ${filename}: ${res.status}`)
  return res.json()
}

export async function fetchKpiSummary() {
  return fetchJson<KpiSummary>('kpi_summary.json')
}
export async function fetchHosts() {
  return fetchJson<HostInfo[]>('hosts.json')
}
export async function fetchHostSummary() {
  return fetchJson<HostSummary[]>('host_summary.json')
}
export async function fetchDiskUtilHourly() {
  return fetchJson<DiskHourly[]>('disk_util_hourly.json')
}
export async function fetchDiskLatencyHourly() {
  return fetchJson<DiskHourly[]>('disk_latency_hourly.json')
}
export async function fetchDiskIOHourly() {
  return fetchJson<DiskIOHourly[]>('disk_io_hourly.json')
}
export async function fetchCpuTrend() {
  return fetchJson<CpuTrendItem[]>('cpu_trend.json')
}
export async function fetchMemTrend() {
  return fetchJson<MemTrendItem[]>('mem_trend.json')
}
export async function fetchNetTrend() {
  return fetchJson<NetTrendItem[]>('net_trend.json')
}
export async function fetchLoadTrend() {
  return fetchJson<LoadTrendItem[]>('load_trend.json')
}
export async function fetchAlerts() {
  return fetchJson<AlertItem[]>('alerts.json')
}
export async function fetchModelStats() {
  return fetchJson<ModelStat[]>('model_stats.json')
}
export async function fetchLocationStats() {
  return fetchJson<LocationStat[]>('location_stats.json')
}

import type {
  HostInfo, HostSummary, KpiSummary, DiskHourly, DiskIOHourly,
  CpuTrendItem, MemTrendItem, NetTrendItem, LoadTrendItem, AlertItem,
  ModelStat, LocationStat,
} from '@/types/dashboard'
