import { createContext, ReactElement, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'

import * as api from '../api'
import { BoardType, ColumnType, TaskType } from '../constants'
import { getId } from '../utils'

interface tokenType {
  username: string,
  _id: string,
  exp: number,
  iat: number,
}

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
  checkIfTokenExpired: () => void
  signIn: (user: userType) => void
  signUp: (newUser: newUserType) => void
  getCurrentBoard: (boardId: string) => void
  getCurrentColumn: (columnId: string) => void
  getCurrentTask: (task: TaskType) => void
  setCurrentTask: SetStateAction<any>
}

const board = { name: '', _id: '', userId: '', createdAt: '', columns: [] }
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

  const checkIfTokenExpired = () => {
    if (user?.result === undefined) {
      navigate('/')
      setUser(null)
      setIsLoading(false)
      return false
    }

    const token = user?.token
    if (token) {
      const decodedToken = decode<tokenType>(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        navigate('/')
        setUser(null)
        setIsLoading(false)
        return true
      }
      return false
    }
  }

  const getBoards = async () => {
    if (checkIfTokenExpired()) return

    setIsLoading(true)
    const { data } = await api.fetchBoards(getId(user?.result._id))

    try {
      setBoards(data === null ? [] : data)
      setCurrentBoard(data.length > 0 && data[0])
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  const createBoard = async (newBoard: BoardType) => {
    if (checkIfTokenExpired()) return

    try {
      await api.createBoard(newBoard)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const updateBoard = async (updatedBoard: BoardType) => {
    if (checkIfTokenExpired()) return

    try {
      await api.updateBoard(getId(currentBoard._id), updatedBoard)
      getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoard = async () => {
    if (checkIfTokenExpired()) return

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
      navigate('/home')
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
      navigate('/home')
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
      checkIfTokenExpired,
      signIn,
      signUp,
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
