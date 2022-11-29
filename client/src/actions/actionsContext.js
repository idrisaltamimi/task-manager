import { createContext, useState } from 'react'

import * as api from '../api'

const ActionsContext = createContext()

const ActionsContextProvider = ({ children }) => {
  const [boards, setBoards] = useState([])

  const getBoards = async () => {
    const { data } = await api.fetchBoards()

    try {
      setBoards(data)
    } catch (error) {
      console.log(error)
    }
  }

  const createBoard = async (newBoard) => {
    const { data } = await api.postBoard(newBoard)
    try {
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActionsContext.Provider value={{ boards, getBoards, createBoard }}>
      {children}
    </ActionsContext.Provider>
  )
}

export { ActionsContext, ActionsContextProvider }
