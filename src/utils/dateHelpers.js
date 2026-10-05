/**
 * dateHelpers.js – utility functions for date display.
 */

/**
 * Format a date string to Indonesian short format.
 * @param {string|null} dateStr – ISO date string
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

/**
 * Return true if the given date is before today.
 * @param {string|null} dateStr
 * @returns {boolean}
 */
export function isOverdue(dateStr) {
  if (!dateStr) return false
  const due = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return due < today
}

/**
 * Convert a Date object or ISO string to the value format for <input type="date">.
 * @param {string|Date|null} value
 * @returns {string}
 */
export function toInputDateValue(value) {
  if (!value) return ''
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toISOString().split('T')[0]
}
