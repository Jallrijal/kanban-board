import Button from '../ui/Button'

/**
 * Header – application-wide top bar.
 * Props:
 *   onAddTask – fn() opens add-task modal
 */
export default function Header({ onAddTask }) {
  return (
    <header
      className="flex items-center justify-between gap-4 px-4 h-14 border-b shrink-0"
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
      }}
    >
      {/* Wordmark */}
      <div className="flex items-center gap-2">
        {/* Simple geometric icon — no sparkles, no AI-default icons */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="7" height="16" rx="1.5" fill="var(--c-accent)" opacity=".9" />
          <rect x="11" y="2" width="7" height="10" rx="1.5" fill="var(--c-accent)" opacity=".4" />
        </svg>
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: 'var(--c-text)' }}
        >
          KanbanFlow
        </span>
      </div>

      {/* Add Task */}
      <Button
        id="btn-add-task"
        variant="primary"
        size="sm"
        onClick={onAddTask}
        aria-label="Add new task"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Tambah Task
      </Button>
    </header>
  )
}
