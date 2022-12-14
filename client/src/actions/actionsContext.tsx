import { createContext, ReactElement, SetStateAction, useState } from 'react'

import * as api from '../api'
import { BoardType, ColumnType, TaskType } from '../constants'
import { getId } from '../utils'

export interface ActionsContextType {
  boards: BoardType[]
  currentBoard: BoardType
  currentColumn: ColumnType
  currentTask: TaskType
  isLoading: boolean
  getBoards: () => void
  createBoard: (newBoard: BoardType) => void
  updateBoard: (updatedBoard: BoardType) => void
  deleteBoard: () => void
  getCurrentBoard: (boardId: string) => void
  getCurrentColumn: (columnId: string) => void
  getCurrentTask: (task: TaskType) => void
  setCurrentTask: SetStateAction<any>
}

const board = { name: '', _id: '', createdAt: '', columns: [] }
const column = { name: '', _id: '', tasks: [] }
const task = { _id: '', name: '', description: '', status: '', subtasks: [] }

const ActionsContext = createContext<ActionsContextType | null>(null)

const ActionsContextProvider = ({ children }: { children: ReactElement }) => {
  const [boards, setBoards] = useState([])
  const [currentBoard, setCurrentBoard] = useState<BoardType>(board)
  const [currentColumn, setCurrentColumn] = useState<ColumnType>(column)
  const [currentTask, setCurrentTask] = useState<TaskType>(task)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentBoard = (boardId: string) => {
    if (boards.length < 1) return
    setCurrentBoard(boards.find(({ _id }) => _id === boardId) || board)
  }

  const getCurrentColumn = (columnId: string) => {
    setCurrentColumn(currentBoard.columns.find(({ _id }) => _id === columnId) || column)
  }

  const getCurrentTask = (task: TaskType) => {
    setCurrentTask(task)
  }

  const getBoards = async () => {
    setIsLoading(true)
    const { data } = await api.fetchBoards()

    try {
      setBoards(data)
      setCurrentBoard(data[0])
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  const createBoard = async (newBoard: BoardType) => {
    try {
      await api.createBoard(newBoard)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const updateBoard = async (updatedBoard: BoardType) => {
    console.log(updatedBoard)
    try {
      await api.updateBoard(getId(currentBoard._id), updatedBoard)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoard = async () => {
    try {
      await api.deleteBoard(getId(currentBoard._id))
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActionsContext.Provider value={{
      getBoards,
      createBoard,
      updateBoard,
      deleteBoard,
      boards,
      currentBoard,
      currentColumn,
      currentTask,
      getCurrentBoard,
      getCurrentColumn,
      getCurrentTask,
      setCurrentTask,
      isLoading,
    }}>
      {children}
    </ActionsContext.Provider>
  )
}

export { ActionsContext, ActionsContextProvider }
