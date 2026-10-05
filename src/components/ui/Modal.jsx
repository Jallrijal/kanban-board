import { useEffect, useRef } from 'react'
import Button from './Button'

/**
 * Accessible modal with focus trap and Esc-to-close.
 * Props:
 *   isOpen  – boolean
 *   onClose – fn
 *   title   – string
 *   children
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null)
  const firstFocusRef = useRef(null)

  /* Lock body scroll and trap focus */
  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement
    firstFocusRef.current?.focus()

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgb(0 0 0 / .45)' }}
    >
      <div
        className="relative w-full max-w-md flex flex-col gap-4 p-6 shadow-xl"
        style={{
          background: 'var(--c-surface)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--shadow-float)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            id="modal-title"
            className="text-base font-semibold"
            style={{ color: 'var(--c-text)' }}
          >
            {title}
          </h2>
          <button
            ref={firstFocusRef}
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[var(--c-border)] text-[var(--c-muted)]"
            style={{ borderRadius: 'var(--r-sm)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  )
}
