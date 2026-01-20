import { useState, useEffect, useCallback } from 'react'
import { SensorData, MetricType } from '../types'

interface UseSensorDataReturn {
  data: SensorData[]
  loading: boolean
  error: Error | null
}

// Cache to store already fetched data
const dataCache: Partial<Record<MetricType, SensorData[]>> = {}

// Export for testing purposes
export const clearCache = () => {
  Object.keys(dataCache).forEach(key => {
    delete dataCache[key as MetricType]
  })
}

export const useSensorData = (metric: MetricType): UseSensorDataReturn => {
  const [data, setData] = useState<SensorData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMetricData = useCallback(async (metricType: MetricType) => {
    // Check if data is already cached
    if (dataCache[metricType]) {
      setData(dataCache[metricType]!)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/data/${metricType}.json`)
      const jsonData = await response.json()
      
      // Cache the fetched data
      dataCache[metricType] = jsonData
      setData(jsonData)
    } catch (err) {
      console.error(`Error loading ${metricType} data:`, err)
      setError(err instanceof Error ? err : new Error(`Failed to load ${metricType} data`))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetricData(metric)
  }, [metric, fetchMetricData])

  return {
    data,
    loading,
    error
  }
}
