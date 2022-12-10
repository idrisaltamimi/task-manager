import { createContext, ReactElement, useState } from 'react'

import * as api from '../api'
import { BoardType, TaskType } from '../constants'

export interface ActionsContextType {
  getBoards: () => void
  createBoard: (newBoard: BoardType) => void
  createTask: (statusId: string, task: TaskType) => void
  updateBoard: (updatedBoard: BoardType) => void
  deleteBoard: () => void
  boards: BoardType[]
  currentBoard: BoardType
  currentBoardId: string
  getCurrentBoardId: (boardId: string) => void
  isLoading: boolean
}

const ActionsContext = createContext<ActionsContextType | null>(null)

const ActionsContextProvider = ({ children }: { children: ReactElement }) => {
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState('')
  const [currentBoard, setCurrentBoard] = useState<any>({ name: '', _id: '', createdAt: '', columns: [] })
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentBoardId = (boardId: string) => {
    setCurrentBoardId(boardId)
    setCurrentBoard(boards.find(({ _id }) => _id === boardId))
  }

  const getBoards = async () => {
    setIsLoading(true)
    const { data } = await api.fetchBoards()

    try {
      setBoards(data)
      setCurrentBoardId(data[0]._id)
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

  const createTask = async (statusId: string, task: TaskType) => {
    try {
      await api.createTask(currentBoardId, statusId, task)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const updateBoard = async (updatedBoard: BoardType) => {
    try {
      await api.updateBoard(currentBoardId, updatedBoard)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoard = async () => {
    try {
      await api.deleteBoard(currentBoardId)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActionsContext.Provider value={{
      getBoards,
      createBoard,
      createTask,
      updateBoard,
      deleteBoard,
      boards,
      currentBoard,
      currentBoardId,
      getCurrentBoardId,
      isLoading
    }}>
      {children}
    </ActionsContext.Provider>
  )
}

export { ActionsContext, ActionsContextProvider }
