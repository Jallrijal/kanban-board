import { useEffect, useReducer } from 'react'
import { saveState, loadState } from '../utils/storage'
import { boardReducer } from '../reducers/boardReducer'
import { ACTION, INITIAL_STATE } from '../utils/constants'
import { nanoid } from 'nanoid'

/**
 * useBoard – encapsulates all board state logic.
 * Hydrates from localStorage on mount; persists on every state change.
 * Returns state + action dispatchers (no raw dispatch exposed outside).
 */
export function useBoard() {
  const [state, dispatch] = useReducer(boardReducer, INITIAL_STATE, () => {
    // Lazy initializer: load from storage or fall back to blank state
    const saved = loadState()
    return saved ?? INITIAL_STATE
  })

  // Persist state on every change (debounced via React batching)
  useEffect(() => {
    saveState(state)
  }, [state])

  /* ── Action creators ─────────────────────────────────────────── */

  function addTask(columnId, taskData) {
    const task = {
      id:          nanoid(),
      title:       taskData.title.trim(),
      description: taskData.description?.trim() || null,
      priority:    taskData.priority || null,
      dueDate:     taskData.dueDate   || null,
      labels:      taskData.labels    || [],
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
    }
    dispatch({ type: ACTION.ADD_TASK, payload: { columnId, task } })
  }

  function updateTask(taskId, changes) {
    dispatch({ type: ACTION.UPDATE_TASK, payload: { taskId, changes } })
  }

  function deleteTask(taskId) {
    dispatch({ type: ACTION.DELETE_TASK, payload: { taskId } })
  }

  function moveTask(taskId, fromColumn, toColumn, toIndex) {
    dispatch({ type: ACTION.MOVE_TASK, payload: { taskId, fromColumn, toColumn, toIndex } })
  }

  function reorderTask(columnId, fromIndex, toIndex) {
    dispatch({ type: ACTION.REORDER_TASK, payload: { columnId, fromIndex, toIndex } })
  }

  function addColumn(title) {
    dispatch({ type: ACTION.ADD_COLUMN, payload: { id: nanoid(), title } })
  }

  return {
    state,
    actions: {
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      reorderTask,
      addColumn,
    },
  }
}
