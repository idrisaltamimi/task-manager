import { createContext, ReactElement, useState } from 'react'

import * as api from '../api'
import { BoardType } from '../constants'

interface ActionsContextType {
  boards: Array<BoardType>
  getBoards: () => void
  createBoard: (newBoard: BoardType) => void
}

const ActionsContext = createContext<ActionsContextType | any>(null)

const ActionsContextProvider = ({ children }: { children: ReactElement }) => {
  const [boards, setBoards] = useState([])

  const getBoards = async () => {
    const { data } = await api.fetchBoards()

    try {
      setBoards(data)
    } catch (error) {
      console.log(error)
    }
  }

  const createBoard = async (newBoard: BoardType) => {
    const { data } = await api.postBoard(newBoard)
    try {

      if (data) return getBoards()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActionsContext.Provider value={{
      boards,
      getBoards,
      createBoard
    }}>
      {children}
    </ActionsContext.Provider>
  )
}

export { ActionsContext, ActionsContextProvider }
