import { useState, useCallback, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import DroppableColumn from './DroppableColumn'
import TaskCard from './TaskCard'

/**
 * Board – Kanban board with full drag-and-drop support via dnd-kit.
 *
 * Design decisions:
 * - Live drag preview is managed in LOCAL state (no reducer calls during drag).
 *   Only onDragEnd commits the final position to the reducer → localStorage.
 * - PointerSensor has 8px activationConstraint so edit/delete button clicks
 *   don't accidentally trigger a drag.
 * - KeyboardSensor enables full keyboard drag-and-drop (Space → arrows → Space).
 *
 * Props:
 *   state        – { tasks, columns, columnOrder }
 *   onAddTask    – fn(columnId)
 *   onEditTask   – fn(taskId)
 *   onDeleteTask – fn(taskId)
 *   onMoveTask   – fn(taskId, fromColumn, toColumn, toIndex)
 *   onReorder    – fn(columnId, fromIndex, toIndex)
 */
export default function Board({
  state,
  filteredState,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onReorder,
}) {
  const { tasks, columns, columnOrder } = state

  /* ── Active drag state ──────────────────────────────────────────────────── */
  const [activeId, setActiveId] = useState(null)

  /* ── Local preview state: only populated while dragging ─────────────────── */
  const [previewColumns, setPreviewColumns] = useState(null)

  /* While dragging: use previewColumns (real data + live rearrangement).
     While idle: use filteredState.columns (search-filtered view).           */
  const displayColumns = previewColumns ?? (filteredState?.columns ?? columns)

  const activeTask = activeId ? tasks[activeId] : null

  /* ── Helper: find which column (in a columns dict) contains a given id ─── */
  function findColId(cols, taskId) {
    return Object.values(cols).find((col) => col.taskIds.includes(taskId))?.id ?? null
  }

  /* ── Sensors ─────────────────────────────────────────────────────────────── */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  /* ── onDragStart ─────────────────────────────────────────────────────────── */
  function handleDragStart({ active }) {
    setActiveId(active.id)
    setPreviewColumns(columns)   // snapshot current columns as base for preview
  }

  /* ── onDragOver – update local preview only ──────────────────────────────── */
  function handleDragOver({ active, over }) {
    if (!over || !previewColumns) return

    const activeTaskId = active.id
    const overId       = over.id

    const fromColId = findColId(previewColumns, activeTaskId)
    if (!fromColId) return

    const toColId =
      previewColumns[overId]                  // hovering over a column droppable
        ? overId
        : findColId(previewColumns, overId)   // hovering over another task

    if (!toColId) return

    if (fromColId === toColId) {
      /* ── Reorder within column ── */
      const taskIds   = previewColumns[fromColId].taskIds
      const fromIndex = taskIds.indexOf(activeTaskId)
      const toIndex   = taskIds.indexOf(overId)
      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return

      setPreviewColumns((prev) => ({
        ...prev,
        [fromColId]: {
          ...prev[fromColId],
          taskIds: arrayMove(prev[fromColId].taskIds, fromIndex, toIndex),
        },
      }))
    } else {
      /* ── Cross-column move ── */
      const toTaskIds  = previewColumns[toColId].taskIds
      const overIndex  = toTaskIds.indexOf(overId)
      const insertAt   = overIndex === -1 ? toTaskIds.length : overIndex

      setPreviewColumns((prev) => {
        const newFrom = prev[fromColId].taskIds.filter((id) => id !== activeTaskId)
        const newTo   = [...prev[toColId].taskIds.filter((id) => id !== activeTaskId)]
        newTo.splice(insertAt, 0, activeTaskId)
        return {
          ...prev,
          [fromColId]: { ...prev[fromColId], taskIds: newFrom },
          [toColId]:   { ...prev[toColId],   taskIds: newTo   },
        }
      })
    }
  }

  /* ── onDragEnd – commit to reducer (localStorage) ───────────────────────── */
  function handleDragEnd({ active }) {
    const activeTaskId = active.id

    if (!previewColumns) {
      setActiveId(null)
      return
    }

    // Derive final position from preview state
    const finalColId   = findColId(previewColumns, activeTaskId)
    const originalColId = findColId(columns, activeTaskId)

    if (finalColId && originalColId) {
      if (finalColId === originalColId) {
        /* Reorder */
        const origIndex  = columns[originalColId].taskIds.indexOf(activeTaskId)
        const finalIndex = previewColumns[finalColId].taskIds.indexOf(activeTaskId)
        if (origIndex !== finalIndex) {
          onReorder(originalColId, origIndex, finalIndex)
        }
      } else {
        /* Move between columns */
        const toIndex = previewColumns[finalColId].taskIds.indexOf(activeTaskId)
        onMoveTask(activeTaskId, originalColId, finalColId, Math.max(0, toIndex))
      }
    }

    setActiveId(null)
    setPreviewColumns(null)
  }

  /* ── onDragCancel – discard preview, revert to real state ───────────────── */
  function handleDragCancel() {
    setActiveId(null)
    setPreviewColumns(null)
  }

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <main
        id="board"
        aria-label="Kanban board"
        className="flex gap-4 overflow-x-auto px-4 pb-6 pt-2"
        style={{ minHeight: 'calc(100vh - 116px)' }}
      >
        {columnOrder.map((colId) => (
          <DroppableColumn
            key={colId}
            column={displayColumns[colId]}
            tasks={tasks}
            onAddTask={onAddTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            activeId={activeId}
          />
        ))}
      </main>

      {/* DragOverlay: floating card that follows the cursor.
          Shadow = --shadow-float (already in design system).
          1.5° tilt is a purposeful lift affordance, not decoration spam. */}
      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeTask ? (
          <div
            style={{
              boxShadow:    'var(--shadow-float)',
              borderRadius: 'var(--r-md)',
              rotate:       '1.5deg',
              opacity:      0.96,
            }}
          >
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
