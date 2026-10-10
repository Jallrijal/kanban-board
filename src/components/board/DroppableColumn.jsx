import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableTaskCard from './SortableTaskCard'

/**
 * DroppableColumn – a Kanban column that accepts dropped tasks.
 * Replaces the previous Column component with full dnd-kit support.
 *
 * Props:
 *   column    – { id, title, taskIds }
 *   tasks     – tasks dict
 *   onAddTask – fn(columnId)
 *   onEdit    – fn(taskId)
 *   onDelete  – fn(taskId)
 *   activeId  – id of the currently dragged item (for visual feedback)
 */
export default function DroppableColumn({
  column,
  tasks,
  onAddTask,
  onEdit,
  onDelete,
  activeId,
}) {
  const columnTasks = column.taskIds.map((id) => tasks[id]).filter(Boolean)

  /* useDroppable makes an empty column still a valid drop target */
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', columnId: column.id },
  })

  const headerAccent = {
    todo:          { dot: '#a3a3a3' },
    'in-progress': { dot: '#f59e0b' },
    done:          { dot: '#22c55e' },
  }[column.id] ?? { dot: 'var(--c-border-md)' }

  return (
    <section
      aria-label={`${column.title} column, ${columnTasks.length} tasks`}
      className="flex flex-col gap-0 flex-1 min-w-0"
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 mb-2"
        style={{
          background:   'var(--c-surface)',
          border:       '1px solid var(--c-border)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: headerAccent.dot }}
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>
            {column.title}
          </h2>
          <span
            className="text-xs px-1.5 py-0.5 font-medium tabular-nums"
            style={{
              background:   'var(--c-border)',
              color:        'var(--c-muted)',
              borderRadius: 'var(--r-sm)',
            }}
          >
            {columnTasks.length}
          </span>
        </div>
      </div>

      {/* Drop zone: task list */}
      <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          role="list"
          aria-label={`${column.title} tasks`}
          className="flex flex-col gap-2 py-1 min-h-[80px] transition-colors duration-150"
          style={{
            /* Subtle highlight when a card is dragged over this column.
               One deliberate use — not glow, just a tinted border.       */
            borderRadius: 'var(--r-md)',
            outline: isOver
              ? '2px solid var(--c-accent)'
              : '2px solid transparent',
            outlineOffset: '2px',
          }}
        >
          {columnTasks.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-1 py-8 px-4 text-center border border-dashed"
              style={{
                borderColor:  'var(--c-border)',
                borderRadius: 'var(--r-md)',
                color:        'var(--c-muted)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              </svg>
              <p className="text-xs">
                {activeId ? 'Lepas di sini untuk memindahkan task.' : 'Belum ada task di sini.'}
              </p>
            </div>
          ) : (
            columnTasks.map((task) => (
              <div role="listitem" key={task.id}>
                <SortableTaskCard
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isActive={activeId === task.id}
                />
              </div>
            ))
          )}
        </div>
      </SortableContext>

    </section>
  )
}
