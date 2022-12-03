import React, { useContext } from 'react'

import { Modal } from '../../components/ui'
import { ModalForm } from '../../components/form'
import { CREATE_BOARD, UPDATE_BOARD } from '../../constants'
import { PortalContext, PortalContextType } from '../../context'
import './styles/addBoard.css'

const AddBoard = () => {
  const { updateModal } = useContext(PortalContext) as PortalContextType

  const action = updateModal ? UPDATE_BOARD : CREATE_BOARD

  return (
    <Modal>
      <ModalForm
        action={action}
        title='Add New Board'
        textInput={{ id: 'new-board', label: 'Board Name', placeholder: 'e.g. Web Design' }}
        inputArray={{ label: 'Columns', buttonLabel: '+ Add New Column' }}
        submit='Create New Board'
      />
    </Modal>
  )
}

export default AddBoard
