/**
 * constants.js – application-wide constants.
 * Centralize here; never hard-code these values inside components.
 */

export const STORAGE_KEY = 'kanbanflow_state_v1'

export const PRIORITY = {
  HIGH:   'high',
  MEDIUM: 'medium',
  LOW:    'low',
}

export const PRIORITY_LABEL = {
  high:   'High',
  medium: 'Medium',
  low:    'Low',
}

/** Default columns created for every new board */
export const DEFAULT_COLUMN_ORDER = ['todo', 'in-progress', 'done']

export const DEFAULT_COLUMNS = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    taskIds: [],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: [],
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: [],
  },
}

export const INITIAL_STATE = {
  tasks: {},
  columns: DEFAULT_COLUMNS,
  columnOrder: DEFAULT_COLUMN_ORDER,
}

/** Action type strings – single source of truth */
export const ACTION = {
  ADD_TASK:     'ADD_TASK',
  UPDATE_TASK:  'UPDATE_TASK',
  DELETE_TASK:  'DELETE_TASK',
  MOVE_TASK:    'MOVE_TASK',
  REORDER_TASK: 'REORDER_TASK',
  ADD_COLUMN:   'ADD_COLUMN',
  LOAD_STATE:   'LOAD_STATE',
}
