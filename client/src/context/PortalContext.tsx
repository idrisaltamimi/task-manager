import { createContext, ReactElement, useContext, useState } from 'react'

import { ActionsContext, ActionsContextType } from '../actions'
import { BoardType } from '../constants'

export interface PortalContextType {
  boardModal: boolean
  editBoard: boolean
  editTask: boolean
  taskModal: boolean
  subtaskModal: boolean
  deleteModal: boolean
  addBoardModal: () => void
  addTaskModal: () => void
  editTaskModal: () => void
  openSubtaskModal: () => void
  openDeleteModal: (board: boolean, task: boolean) => void
  addColumn: () => void
  closeModal: () => void
  closeAndPost: (updatedBoard: BoardType) => void
}

interface Props {
  children: ReactElement
}

const PortalContext = createContext<PortalContextType | null>(null)

const PortalContextProvider: React.FC<Props> = ({ children }) => {
  const { updateBoard } = useContext(ActionsContext) as ActionsContextType
  const [boardModal, setBoardModal] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [subtaskModal, setSubtaskModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editBoard, setEditBoard] = useState(false)
  const [editTask, setEditTask] = useState(false)

  const addBoardModal = () => setBoardModal(true)

  const editBoardModal = () => setEditBoard(true)

  const addTaskModal = () => setTaskModal(true)

  const openDeleteModal = (board: boolean, task: boolean) => {
    setDeleteModal(true)
    board && setEditBoard(true)
    if (task) {
      setSubtaskModal(false)
      setEditTask(true)
    }
  }


  const editTaskModal = () => {
    addTaskModal()
    setEditTask(true)
  }

  const openSubtaskModal = () => setSubtaskModal(true)

  const closeModal = () => {
    setBoardModal(false)
    setEditBoard(false)
    setTaskModal(false)
    setEditTask(false)
    setSubtaskModal(false)
    setDeleteModal(false)
  }

  const closeAndPost = async (updatedBoard: BoardType) => {
    updateBoard(updatedBoard)
    setSubtaskModal(false)
  }

  const addColumn = () => {
    addBoardModal()
    editBoardModal()
  }

  return (
    <PortalContext.Provider value={{
      boardModal,
      editBoard,
      taskModal,
      editTask,
      subtaskModal,
      deleteModal,
      addBoardModal,
      addTaskModal,
      editTaskModal,
      openSubtaskModal,
      openDeleteModal,
      addColumn,
      closeModal,
      closeAndPost
    }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
