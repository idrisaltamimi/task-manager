import { createContext, useState } from 'react'

const PortalContext = createContext()

const PortalContextProvider = ({ children }) => {
  const [boardModal, setBoardModal] = useState(false)

  const addBoardModal = () => setBoardModal(true)

  return (
    <PortalContext.Provider value={{ boardModal, addBoardModal }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
