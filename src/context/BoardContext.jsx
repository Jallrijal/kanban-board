import { createContext, useContext } from 'react'
import { useBoard } from '../hooks/useBoard'

/**
 * BoardContext – provides board state + actions to the whole tree.
 * Only useBoard() is imported here; the context just distributes its output.
 */
const BoardContext = createContext(null)

/**
 * BoardProvider – wrap the app with this to enable board state everywhere.
 */
export function BoardProvider({ children }) {
  const board = useBoard()
  return <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
}

/**
 * useBoardContext – consume board state and actions in any component.
 * Throws if used outside <BoardProvider>.
 */
export function useBoardContext() {
  const ctx = useContext(BoardContext)
  if (!ctx) {
    throw new Error('useBoardContext must be used inside <BoardProvider>')
  }
  return ctx
}
