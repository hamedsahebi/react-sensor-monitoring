import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HistoricalDashboard } from './pages/HistoricalDashboard'
import { RealTimeDashboard } from './pages/RealTimeDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HistoricalDashboard />} />
          <Route path="/realtime" element={<RealTimeDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
