import { useState } from 'react'
import { MetricType } from './types'
import { metrics } from './constants/metrics'
import { useSensorData } from './hooks/useSensorData'
import { MetricCard } from './components/MetricCard'
import { MetricChart } from './components/MetricChart'

function App() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('temperature')
  const { data, loading } = useSensorData(selectedMetric)

  const getCurrentValue = (metric: MetricType) => {
    // For the selected metric, use the loaded data
    if (metric === selectedMetric) {
      return data.length > 0 ? data[data.length - 1].value : null
    }
    // For other metrics, we don't have their data yet
    return null
  }

  const currentMetric = metrics.find(m => m.id === selectedMetric)!
  const currentData = data

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading sensor data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Compressor Monitor</h1>
            <p className="text-sm text-gray-600 mt-1">Select a metric to view</p>
          </div>

          <div className="space-y-3">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                currentValue={getCurrentValue(metric.id)}
                isActive={selectedMetric === metric.id}
                onClick={() => setSelectedMetric(metric.id)}
              />
            ))}
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span>{currentMetric.icon}</span>
              {currentMetric.name}
            </h2>
            <p className="text-gray-600 mt-1">Historical data visualization</p>
          </div>

          <MetricChart metric={currentMetric} data={currentData} />
        </div>
      </div>
    </div>
  )
}

export default App
