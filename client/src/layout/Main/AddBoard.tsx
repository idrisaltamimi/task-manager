import React from 'react'

import { Modal } from '../../components/ui'
import { ModalForm } from '../../components/form'
import { CREATE_BOARD } from '../../constants'
import './styles/addBoard.css'

const AddBoard = () => {
  return (
    <Modal>
      <ModalForm
        action={CREATE_BOARD}
        title='Add New Board'
        textInput={{ id: 'new-board', label: 'Board Name', placeholder: 'e.g. Web Design' }}
        inputArray={{ label: 'Columns', buttonLabel: '+ Add New Column' }}
        submit='Create New Board'
      />
    </Modal>
  )
}

export default AddBoard
