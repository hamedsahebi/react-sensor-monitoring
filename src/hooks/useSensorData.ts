import { useState, useEffect } from 'react'
import { SensorData } from '../types'

interface UseSensorDataReturn {
  temperatureData: SensorData[]
  pressureData: SensorData[]
  vibrationData: SensorData[]
  powerData: SensorData[]
  loading: boolean
  error: Error | null
}

export const useSensorData = (): UseSensorDataReturn => {
  const [temperatureData, setTemperatureData] = useState<SensorData[]>([])
  const [pressureData, setPressureData] = useState<SensorData[]>([])
  const [vibrationData, setVibrationData] = useState<SensorData[]>([])
  const [powerData, setPowerData] = useState<SensorData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [temp, press, vib, pow] = await Promise.all([
          fetch('/data/temperature.json').then(res => res.json()),
          fetch('/data/pressure.json').then(res => res.json()),
          fetch('/data/vibration.json').then(res => res.json()),
          fetch('/data/power.json').then(res => res.json())
        ])
        
        setTemperatureData(temp)
        setPressureData(press)
        setVibrationData(vib)
        setPowerData(pow)
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err instanceof Error ? err : new Error('Failed to load data'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    temperatureData,
    pressureData,
    vibrationData,
    powerData,
    loading,
    error
  }
}
