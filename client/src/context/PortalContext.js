import { createContext, useState } from 'react'

const PortalContext = createContext()

const PortalContextProvider = ({ children }) => {
  const [boardModal, setBoardModal] = useState(false)

  const addBoardModal = () => setBoardModal(true)
  const closeModal = () => setBoardModal(false)

  return (
    <PortalContext.Provider value={{ boardModal, addBoardModal, closeModal }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
