import { useState, useMemo } from 'react'
import { BoardProvider, useBoardContext } from './context/BoardContext'
import Board from './components/board/Board'
import Header from './components/layout/Header'
import Toolbar from './components/layout/Toolbar'
import TaskModal from './components/task/TaskModal'
import ConfirmDialog from './components/ui/ConfirmDialog'
import './index.css'

/* ─── Inner app (consumes context) ──────────────────────────────────────────── */
function KanbanApp() {
  const { state, actions } = useBoardContext()

  /* ── UI state ────────────────────────────────────────────────────────────── */
  const [search, setSearch] = useState('')
  const [taskModal, setTaskModal] = useState({
    open: false,
    mode: 'add',
    columnId: null,
    task: null,
  })
  const [confirmDelete, setConfirmDelete] = useState({ open: false, taskId: null })

  /* ── Search filtering ──────────────────────────────────────────────────────
     We compute a filtered view of the state without mutating the source.
     Columns still show; cards that don't match are hidden.               */
  const filteredState = useMemo(() => {
    if (!search.trim()) return state

    const q = search.toLowerCase()
    const matchingIds = new Set(
      Object.values(state.tasks)
        .filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            (t.description && t.description.toLowerCase().includes(q)) ||
            (t.labels && t.labels.some((l) => l.toLowerCase().includes(q)))
        )
        .map((t) => t.id)
    )

    const columns = Object.fromEntries(
      Object.entries(state.columns).map(([colId, col]) => [
        colId,
        { ...col, taskIds: col.taskIds.filter((id) => matchingIds.has(id)) },
      ])
    )

    return { ...state, columns }
  }, [state, search])

  /* ── Modal handlers ──────────────────────────────────────────────────────── */
  function openAdd(columnId = 'todo') {
    setTaskModal({ open: true, mode: 'add', columnId, task: null })
  }

  function openEdit(taskId) {
    const task = state.tasks[taskId]
    if (!task) return
    setTaskModal({ open: true, mode: 'edit', columnId: null, task })
  }

  function openDelete(taskId) {
    setConfirmDelete({ open: true, taskId })
  }

  function handleModalSubmit(values) {
    if (taskModal.mode === 'add') {
      actions.addTask(taskModal.columnId, values)
    } else {
      actions.updateTask(taskModal.task.id, values)
    }
  }

  function handleDeleteConfirm() {
    if (confirmDelete.taskId) {
      actions.deleteTask(confirmDelete.taskId)
    }
  }

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: 'var(--c-bg)' }}
    >
      <Header onAddTask={() => openAdd('todo')} />
      <Toolbar state={state} search={search} onSearch={setSearch} />

      <Board
        state={state}
        filteredState={filteredState}
        onAddTask={openAdd}
        onEditTask={openEdit}
        onDeleteTask={openDelete}
        onMoveTask={actions.moveTask}
        onReorder={actions.reorderTask}
      />

      {/* Task add / edit modal */}
      <TaskModal
        mode={taskModal.mode}
        isOpen={taskModal.open}
        onClose={() => setTaskModal((p) => ({ ...p, open: false }))}
        initialValues={taskModal.task ?? {}}
        onSubmit={handleModalSubmit}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, taskId: null })}
        onConfirm={handleDeleteConfirm}
        message="Task ini akan dihapus permanen dan tidak bisa dipulihkan."
      />
    </div>
  )
}

/* ─── Root (provides context) ───────────────────────────────────────────────── */
export default function App() {
  return (
    <BoardProvider>
      <KanbanApp />
    </BoardProvider>
  )
}
