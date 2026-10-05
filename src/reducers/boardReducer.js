import { ACTION, INITIAL_STATE } from '../utils/constants'

/**
 * boardReducer – pure function, no side effects.
 * All state mutations go through here.
 *
 * State shape (normalized):
 * {
 *   tasks:       { [taskId]: Task }
 *   columns:     { [columnId]: Column }
 *   columnOrder: string[]
 * }
 */
export function boardReducer(state, action) {
  switch (action.type) {

    /* ── ADD_TASK ──────────────────────────────────────────────────────────── */
    case ACTION.ADD_TASK: {
      const { columnId, task } = action.payload
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            taskIds: [...state.columns[columnId].taskIds, task.id],
          },
        },
      }
    }

    /* ── UPDATE_TASK ───────────────────────────────────────────────────────── */
    case ACTION.UPDATE_TASK: {
      const { taskId, changes } = action.payload
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            ...changes,
            updatedAt: new Date().toISOString(),
          },
        },
      }
    }

    /* ── DELETE_TASK ───────────────────────────────────────────────────────── */
    case ACTION.DELETE_TASK: {
      const { taskId } = action.payload

      // Remove task from tasks dict
      const tasks = { ...state.tasks }
      delete tasks[taskId]

      // Remove taskId from whichever column contains it
      const columns = Object.fromEntries(
        Object.entries(state.columns).map(([colId, col]) => [
          colId,
          { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) },
        ])
      )

      return { ...state, tasks, columns }
    }

    /* ── MOVE_TASK (between columns) ───────────────────────────────────────── */
    case ACTION.MOVE_TASK: {
      const { taskId, fromColumn, toColumn, toIndex } = action.payload

      // Remove from source
      const fromTaskIds = state.columns[fromColumn].taskIds.filter(
        (id) => id !== taskId
      )

      // Insert into destination at toIndex
      const toTaskIds = [...state.columns[toColumn].taskIds]
      // Avoid duplicate if task is already there (same column move handled by REORDER)
      const filtered = toTaskIds.filter((id) => id !== taskId)
      filtered.splice(toIndex, 0, taskId)

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColumn]: { ...state.columns[fromColumn], taskIds: fromTaskIds },
          [toColumn]:   { ...state.columns[toColumn],   taskIds: filtered    },
        },
      }
    }

    /* ── REORDER_TASK (within same column) ─────────────────────────────────── */
    case ACTION.REORDER_TASK: {
      const { columnId, fromIndex, toIndex } = action.payload
      const taskIds = [...state.columns[columnId].taskIds]
      const [moved] = taskIds.splice(fromIndex, 1)
      taskIds.splice(toIndex, 0, moved)

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: { ...state.columns[columnId], taskIds },
        },
      }
    }

    /* ── ADD_COLUMN ────────────────────────────────────────────────────────── */
    case ACTION.ADD_COLUMN: {
      const { id, title } = action.payload
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: { id, title, taskIds: [] },
        },
        columnOrder: [...state.columnOrder, id],
      }
    }

    /* ── LOAD_STATE (hydrate from storage) ─────────────────────────────────── */
    case ACTION.LOAD_STATE: {
      return action.payload.state ?? INITIAL_STATE
    }

    default:
      return state
  }
}
