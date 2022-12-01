import { createContext, ReactElement, useEffect, useState } from 'react'
import uuid from 'react-uuid'

import { ListTextField } from '../components/form'

interface InputListType {
  item: ReactElement
  id: string
}

interface PortalContextType {
  boardModal: boolean
  addBoardModal: () => void
  closeModal: () => void
  addColumnInput: () => void
  inputList: ReactElement[]
  deleteColumnInput: (index: number) => void
}

interface Props {
  children: ReactElement
}

const PortalContext = createContext<PortalContextType | any>(null)

const PortalContextProvider: React.FC<Props> = ({ children }) => {
  const [boardModal, setBoardModal] = useState(false)
  const [inputList, setInputList] = useState<InputListType[]>([])
  const [id, setId] = useState('')

  const addColumnInput = () => {
    const id = uuid()
    setInputList(inputList.concat({
      item: <ListTextField key={id} id={id} />,
      id: id
    }))
  }

  useEffect(() => {
    addColumnInput()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id === '') return
    setInputList(prev => prev.filter(i => i.id !== id))
  }, [id])

  const addBoardModal = () => setBoardModal(true)
  const closeModal = () => setBoardModal(false)

  const getId = (value: string) => setId(value)
  console.log(inputList)
  return (
    <PortalContext.Provider value={{
      boardModal,
      addBoardModal,
      closeModal,
      addColumnInput,
      inputList,
      getId
    }}>
      {children}
    </PortalContext.Provider>
  )
}

export { PortalContext, PortalContextProvider }
