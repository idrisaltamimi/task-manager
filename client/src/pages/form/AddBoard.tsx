import React from 'react'
import { TextField } from '../../components/form'

import { Modal } from '../../components/ui'

const AddBoard = () => {
  return (
    <Modal>
      <>
        <h2>Add New Board</h2>
        <TextField
          type='text'
          label='Name'
          required={true}
          id='board-name'
          textField={{ value: 'name', error: true }}
        />
      </>
    </Modal>
  )
}

export default AddBoard
