import { useEffect, useState } from 'react'

/**
 * useLocalStorage – generic hook to sync a state value with localStorage.
 * Kept separate from useBoard so it can be reused for preferences (e.g. theme).
 *
 * @param {string} key    – localStorage key
 * @param {*}      defaultValue
 * @returns {[value, setValue]}
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota exceeded or private mode – ignore
    }
  }, [key, value])

  return [value, setValue]
}
