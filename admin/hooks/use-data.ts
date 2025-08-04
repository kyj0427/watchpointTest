"use client"

import { useState, useEffect } from "react"

export function useData<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      setIsUsingFallback(false)

      const result = await fetchFn()
      setData(result)

      // Check if we're using fallback data by looking for console warnings
      const originalWarn = console.warn
      let fallbackDetected = false
      console.warn = (...args) => {
        if (args[0]?.includes("using fallback data")) {
          fallbackDetected = true
        }
        originalWarn(...args)
      }

      // Restore original console.warn
      setTimeout(() => {
        console.warn = originalWarn
        setIsUsingFallback(fallbackDetected)
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return { data, loading, error, isUsingFallback, refetch: loadData }
}
