import Badge from '../ui/Badge'
import { formatDate, isOverdue } from '../../utils/dateHelpers'
import { PRIORITY_LABEL } from '../../utils/constants'

/**
 * TaskCard – displays a single task in a column.
 *
 * Props:
 *   task     – { id, title, description, priority, dueDate, labels }
 *   onEdit   – fn(taskId)
 *   onDelete – fn(taskId)
 */
export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityVariant = task.priority ?? 'neutral'
  const overdue = isOverdue(task.dueDate)

  return (
    <article
      className="group flex flex-col gap-2 p-3 border cursor-grab active:cursor-grabbing transition-shadow duration-150 hover:shadow-md"
      style={{
        background:   'var(--c-surface)',
        borderColor:  'var(--c-border)',
        borderRadius: 'var(--r-md)',
        boxShadow:    'var(--shadow-card)',
      }}
      aria-label={`Task: ${task.title}`}
    >
      {/* Top row: priority badge + hover actions */}
      <div className="flex items-center justify-between gap-2 min-h-[20px]">
        {task.priority ? (
          <Badge variant={priorityVariant}>
            {PRIORITY_LABEL[task.priority] ?? task.priority}
          </Badge>
        ) : (
          <span />
        )}

        {/* Action buttons – revealed on hover for visual cleanliness */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            aria-label={`Edit task: ${task.title}`}
            onClick={() => onEdit?.(task.id)}
            className="flex items-center justify-center w-6 h-6 text-[var(--c-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-border)] transition-colors"
            style={{ borderRadius: 'var(--r-sm)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M8.5 1.5a1.414 1.414 0 012 2L3.5 10.5 1 11l.5-2.5 7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Delete task: ${task.title}`}
            onClick={() => onDelete?.(task.id)}
            className="flex items-center justify-center w-6 h-6 text-[var(--c-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            style={{ borderRadius: 'var(--r-sm)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 3h8M5 3V2h2v1M4 3v6a1 1 0 001 1h2a1 1 0 001-1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <p className="text-sm font-medium leading-snug" style={{ color: 'var(--c-text)' }}>
        {task.title}
      </p>

      {/* Description */}
      {task.description && (
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--c-muted)' }}>
          {task.description}
        </p>
      )}

      {/* Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <Badge key={label} variant="neutral">{label}</Badge>
          ))}
        </div>
      )}

      {/* Due date */}
      {task.dueDate && (
        <div
          className={`flex items-center gap-1 text-[11px] mt-0.5 ${
            overdue ? 'text-red-500' : 'text-[var(--c-muted)]'
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <rect x="1" y="2" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1 5h9M4 1v2M7 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <time dateTime={task.dueDate}>{formatDate(task.dueDate)}</time>
          {overdue && <span className="font-semibold">· lewat tenggat</span>}
        </div>
      )}
    </article>
  )
}
