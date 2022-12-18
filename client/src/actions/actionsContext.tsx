import { createContext, ReactElement, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as api from '../api'
import { BoardType, ColumnType, TaskType } from '../constants'
import { getId } from '../utils'

export interface userLoginType {
  result: { _id: string, username: string, password: string },
  token: string
}

export interface userType {
  username: string,
  password: string
}

export interface newUserType {
  username: string,
  password: string,
  confirmPassword: string,
}

export interface ActionsContextType {
  boards: BoardType[]
  user: any
  userError: any
  currentBoard: BoardType
  currentColumn: ColumnType
  currentTask: TaskType
  isLoading: boolean
  getBoards: () => void
  createBoard: (newBoard: BoardType) => void
  updateBoard: (updatedBoard: BoardType) => void
  deleteBoard: () => void
  removeUser: () => void
  signIn: (user: userType) => void
  signUp: (newUser: newUserType) => void
  logout: () => void
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
  const navigate = useNavigate()

  const storedUser = JSON.parse(localStorage.getItem('profile') || 'null')
  const userJson = storedUser !== 'null' && storedUser

  const [boards, setBoards] = useState([])
  const [user, setUser] = useState<userLoginType | null>(userJson?.data || userJson)
  const [userError, setUserError] = useState<any>(null)
  const [currentBoard, setCurrentBoard] = useState<BoardType>(board)
  const [currentColumn, setCurrentColumn] = useState<ColumnType>(column)
  const [currentTask, setCurrentTask] = useState<TaskType>(task)
  const [isLoading, setIsLoading] = useState(false)

  const removeUser = () => setUser(null)

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

  const logout = () => {
    if (user?.result === undefined) {
      navigate('/auth')
      removeUser()
    }
  }

  const getBoards = async () => {
    logout()
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

  const signIn = async (user: userType) => {
    try {
      setIsLoading(true)
      const { data } = await api.signIn(user)

      localStorage.setItem('profile', JSON.stringify({ data }))
      setUser(data)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        setUserError(error)
        setIsLoading(false)
      }
    }
  }

  const signUp = async (newUser: newUserType) => {
    try {
      setIsLoading(true)
      const { data: { data } } = await api.signUp(newUser)

      localStorage.setItem('profile', JSON.stringify({ data }))
      setUser(data)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        setUserError(error)
        setIsLoading(false)
      }
    }
  }

  return (
    <ActionsContext.Provider value={{
      getBoards,
      createBoard,
      updateBoard,
      deleteBoard,
      removeUser,
      signIn,
      signUp,
      logout,
      boards,
      user,
      userError,
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
