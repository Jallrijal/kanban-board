import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskCard from './TaskCard'

/**
 * SortableTaskCard – wraps TaskCard with useSortable from dnd-kit.
 * The drag handle is the whole card; clicking edit/delete still works
 * because dnd-kit's PointerSensor has an activationConstraint distance.
 *
 * Props:
 *   task     – task object
 *   onEdit   – fn(taskId)
 *   onDelete – fn(taskId)
 *   isActive – boolean (true when this card IS the drag ghost)
 */
export default function SortableTaskCard({ task, onEdit, onDelete, isActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: 'task', task },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // When actively dragging: keep a transparent placeholder in the list
    opacity:   isDragging ? 0.35 : 1,
    // Prevent layout shift: keep the same height even when semi-transparent
    pointerEvents: isDragging ? 'none' : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-roledescription="sortable task card"
    >
      <TaskCard
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}
