export interface HostInfo {
  hostid: string
  hostname: string
  owner: string
  model: string
  location1: string
  location2: string
}

export interface HostSummary {
  hostid: string
  hostname: string
  owner: string
  model: string
  location: string
  avg_disk_util: number
  max_disk_util: number
  avg_disk_latency: number
  avg_cpu: number
  avg_mem_used: number
}

export interface KpiSummary {
  total_hosts: number
  total_disk_records: number
  total_pref_records: number
  time_range_start: string
  time_range_end: string
  disk_util: { value: number; min: number; max: number }
  disk_latency: { value: number; min: number; max: number }
  cpu: { value: number; min: number; max: number }
  model_distribution: Record<string, number>
  location_distribution: Record<string, number>
  alert_count: number
}

export interface DiskHourly {
  hour: string
  sda: number | null
  sdb: number | null
  sdc: number | null
  sdd: number | null
  sde: number | null
}

export interface DiskIOHourly {
  hour: string
  sda_read: number
  sda_write: number
  sdb_read: number
  sdb_write: number
  sdc_read: number
  sdc_write: number
  sdd_read: number
  sdd_write: number
  sde_read: number
  sde_write: number
}

export interface CpuTrendItem {
  hour: string
  cpu_usage: number | null
  cpu_user: number | null
  cpu_sys: number | null
  cpu_wait: number | null
  cpu_idle: number | null
}

export interface MemTrendItem {
  hour: string
  mem_used: number | null
  mem_free: number | null
  mem_buff: number | null
  mem_cache: number | null
}

export interface NetTrendItem {
  hour: string
  net_in: number | null
  net_out: number | null
}

export interface LoadTrendItem {
  hour: string
  load1: number | null
  load5: number | null
  load15: number | null
}

export interface AlertItem {
  ts: string
  hostid: string
  mod: string
  value: number
  type: string
}

export interface ModelStat {
  model: string
  count: number
}

export interface LocationStat {
  location: string
  count: number
}
