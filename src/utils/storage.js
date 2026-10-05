import { STORAGE_KEY } from './constants'

/**
 * Persist board state to localStorage.
 * @param {object} state
 */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    // Storage quota exceeded or private mode – fail silently
    console.warn('[KanbanFlow] Could not save to localStorage:', err.message)
  }
}

/**
 * Load board state from localStorage.
 * Returns null if nothing is stored or the data is corrupt.
 * @returns {object|null}
 */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    console.warn('[KanbanFlow] Could not load from localStorage:', err.message)
    return null
  }
}

/**
 * Clear the persisted state entirely.
 */
export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (_) {
    // ignore
  }
}
