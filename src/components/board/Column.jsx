import TaskCard from './TaskCard'
import Button from '../ui/Button'

/**
 * Column – a single status lane in the Kanban board.
 * Props:
 *   column    – { id, title, taskIds }
 *   tasks     – object keyed by taskId
 *   onAddTask – fn(columnId)
 *   onEdit    – fn(taskId)
 *   onDelete  – fn(taskId)
 */
export default function Column({ column, tasks, onAddTask, onEdit, onDelete }) {
  const columnTasks = column.taskIds.map((id) => tasks[id]).filter(Boolean)

  const headerAccent = {
    todo:          { dot: '#a3a3a3', label: 'To Do'       },  // neutral
    'in-progress': { dot: '#f59e0b', label: 'In Progress' },  // amber – one deliberate accent use
    done:          { dot: '#22c55e', label: 'Done'        },  // green – semantic success
  }[column.id] ?? { dot: 'var(--c-border-md)', label: column.title }

  return (
    <section
      aria-label={`${column.title} column, ${columnTasks.length} tasks`}
      className="flex flex-col gap-0 min-w-[270px] max-w-[320px] w-full shrink-0"
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 mb-2"
        style={{
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <div className="flex items-center gap-2">
          {/* Status dot – small, single color use per column */}
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: headerAccent.dot }}
            aria-hidden="true"
          />
          <h2
            className="text-sm font-semibold"
            style={{ color: 'var(--c-text)' }}
          >
            {column.title}
          </h2>
          {/* Task count */}
          <span
            className="text-xs px-1.5 py-0.5 font-medium tabular-nums"
            style={{
              background: 'var(--c-border)',
              color: 'var(--c-muted)',
              borderRadius: 'var(--r-sm)',
            }}
          >
            {columnTasks.length}
          </span>
        </div>
        {/* Add task button */}
        <button
          type="button"
          aria-label={`Add task to ${column.title}`}
          onClick={() => onAddTask?.(column.id)}
          className="flex items-center justify-center w-6 h-6 rounded text-[var(--c-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-border)] transition-colors"
          style={{ borderRadius: 'var(--r-sm)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Task list */}
      <div
        className="flex flex-col gap-2 px-0 py-1 min-h-[120px]"
        role="list"
        aria-label={`${column.title} tasks`}
      >
        {columnTasks.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-1 py-8 px-4 text-center border border-dashed"
            style={{
              borderColor: 'var(--c-border)',
              borderRadius: 'var(--r-md)',
              color: 'var(--c-muted)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
            </svg>
            <p className="text-xs">Belum ada task di sini.</p>
          </div>
        ) : (
          columnTasks.map((task) => (
            <div role="listitem" key={task.id}>
              <TaskCard
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))
        )}
      </div>

      {/* Bottom add-task link */}
      <button
        type="button"
        onClick={() => onAddTask?.(column.id)}
        className="flex items-center gap-1.5 px-2 py-2 mt-1 w-full text-xs text-left rounded transition-colors hover:bg-[var(--c-border)] text-[var(--c-muted)] hover:text-[var(--c-text)]"
        style={{ borderRadius: 'var(--r-sm)' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Tambah task
      </button>
    </section>
  )
}
