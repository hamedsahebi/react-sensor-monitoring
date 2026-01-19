import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSensorData } from '../useSensorData'

// Mock fetch globally
global.fetch = vi.fn()

describe('useSensorData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state initially', () => {
    // Mock fetch to never resolve
    ;(global.fetch as any).mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useSensorData())

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)
    expect(result.current.temperatureData).toEqual([])
    expect(result.current.pressureData).toEqual([])
    expect(result.current.vibrationData).toEqual([])
    expect(result.current.powerData).toEqual([])
  })

  it('should fetch all sensor data successfully', async () => {
    const mockData = [
      { timestamp: '2026-01-16T08:00:00Z', value: 75 },
      { timestamp: '2026-01-16T08:05:00Z', value: 76 }
    ]

    // Mock all fetch calls to return the same data
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const { result } = renderHook(() => useSensorData())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(null)
    expect(result.current.temperatureData).toEqual(mockData)
    expect(result.current.pressureData).toEqual(mockData)
    expect(result.current.vibrationData).toEqual(mockData)
    expect(result.current.powerData).toEqual(mockData)
  })

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch sensor data'
    
    ;(global.fetch as any).mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useSensorData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe(errorMessage)
    expect(result.current.temperatureData).toEqual([])
    expect(result.current.pressureData).toEqual([])
    expect(result.current.vibrationData).toEqual([])
    expect(result.current.powerData).toEqual([])
  })

  it('should handle HTTP error responses', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404
    })

    const { result } = renderHook(() => useSensorData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
    expect(result.current.temperatureData).toEqual([])
  })

  it('should fetch data only once on mount', async () => {
    const mockData = [{ timestamp: '2026-01-16T08:00:00Z', value: 75 }]
    
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const { result, rerender } = renderHook(() => useSensorData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Clear mock call count
    vi.clearAllMocks()

    // Rerender the hook
    rerender()

    // Should not fetch again
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
