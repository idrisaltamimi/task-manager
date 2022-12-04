import { createContext, ReactElement, useState } from 'react'

export interface PortalContextType {
  boardModal: boolean
  updateModal: boolean
  addBoardModal: () => void
  closeModal: () => void
  addColumn: () => void
}

interface Props {
  children: ReactElement
}

const PortalContext = createContext<PortalContextType | null>(null)

const PortalContextProvider: React.FC<Props> = ({ children }) => {
  const [boardModal, setBoardModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)

  const addBoardModal = () => setBoardModal(true)
  const updateBoardModal = () => setUpdateModal(true)
  const closeModal = () => {
    setBoardModal(false)
    setUpdateModal(false)
  }

  const addColumn = () => {
    addBoardModal()
    updateBoardModal()
  }

  return (
    <PortalContext.Provider value={{
      boardModal,
      updateModal,
      addBoardModal,
      closeModal,
      addColumn
    }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
