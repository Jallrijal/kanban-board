import { useState } from 'react'

/**
 * Toolbar – search bar, filter controls, and task count summary.
 *
 * Props:
 *   state    – board state (for counting tasks)
 *   search   – string
 *   onSearch – fn(string)
 */
export default function Toolbar({ state, search, onSearch }) {
  const totalTasks = Object.keys(state.tasks).length

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 border-b"
      style={{
        background:   'var(--c-surface)',
        borderColor:  'var(--c-border)',
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          aria-hidden="true"
          style={{ color: 'var(--c-muted)' }}
        >
          <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input
          id="toolbar-search"
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari task…"
          aria-label="Cari task"
          className="w-full pl-8 pr-3 py-1.5 text-xs border outline-none transition-colors focus:border-[var(--c-accent)]"
          style={{
            background:   'var(--c-bg)',
            borderColor:  'var(--c-border-md)',
            borderRadius: 'var(--r-sm)',
            color:        'var(--c-text)',
          }}
        />
      </div>

      {/* Task count */}
      <span
        className="text-xs tabular-nums ml-auto"
        style={{ color: 'var(--c-muted)' }}
        aria-live="polite"
        aria-label={`Total ${totalTasks} task`}
      >
        {totalTasks} task{totalTasks !== 1 ? '' : ''}
      </span>
    </div>
  )
}
