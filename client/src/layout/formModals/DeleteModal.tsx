import React, { FormEvent, useContext, useState } from 'react'
import { ActionsContext, ActionsContextType } from '../../actions'

import { Button, Modal, Processing } from '../../components/ui'
import { PortalContext, PortalContextType } from '../../context'
import './styles/modalForm.css'

const DeleteModal = () => {
  const { deleteBoard, updateBoard, currentColumn, currentBoard, currentTask } = useContext(ActionsContext) as ActionsContextType
  const { closeModal, editBoard, editTask } = useContext(PortalContext) as PortalContextType
  const [removeLoading, setRemoveLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newTasks = currentColumn.tasks?.filter(({ _id }) => _id !== currentTask._id)
    const newColumns = currentBoard.columns?.map((item) => (
      item._id === currentColumn._id ? { ...item, tasks: newTasks } : item
    ))

    setRemoveLoading(true)
    editBoard && await deleteBoard()
    editTask && await updateBoard({ ...currentBoard, columns: newColumns })
    setRemoveLoading(false)
    closeModal()
  }

  return (
    <Modal close={closeModal}>
      <form className='modal-form' onSubmit={onSubmit}>
        <h2 className='modal-title modal-title-delete'>{editBoard ? 'Delete this board?' : 'Delete this task?'}</h2>
        <p className='modal-paragraph'>
          {editBoard && `Are you sure you want to delete the ‘${currentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
          {editTask && `Are you sure you want to delete the ‘${currentTask.name}’ task and its subtasks? This action cannot be reversed.`}
        </p>
        <div className='delete-container'>
          <Button
            text={removeLoading ? <Processing color='white' /> : 'Delete'}
            theme='red'
            size='small'
          />
          <Button
            type='button'
            text='Cancel'
            theme='addButton'
            size='small'
            fn={closeModal}
          />
        </div>
      </form>
    </Modal>
  )
}

export default DeleteModal
