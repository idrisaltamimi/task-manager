import { createContext, ReactElement, useState } from 'react'

export interface PortalContextType {
  boardModal: boolean
  updateModal: boolean
  addBoardModal: () => void
  updateBoardModal: () => void
  closeModal: () => void
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
  const closeModal = () => setBoardModal(false)

  return (
    <PortalContext.Provider value={{
      boardModal,
      updateModal,
      addBoardModal,
      updateBoardModal,
      closeModal
    }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
