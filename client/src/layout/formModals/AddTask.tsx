import React, { useContext, useState } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { ModalForm } from '../../components/form'
import { Modal } from '../../components/ui'
import { CREATE_TASK } from '../../constants'
import { getId } from '../../utils'

const AddTask = () => {
  const { currentBoard } = useContext(ActionsContext) as ActionsContextType
  const options = currentBoard.columns.map(({ name, _id }) => ({ name, id: getId(_id) }))
  const [current, setCurrent] = useState({ name: options[0].name, id: options[0].id })


  const description = "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."

  return (
    <Modal>
      <ModalForm
        action={CREATE_TASK}
        title='Add New Task'
        textInput={{ id: 'new-task', label: 'Title', placeholder: 'e.g. Take coffee break' }}
        textArea={{ id: 'task-description', label: 'Description', placeholder: description }}
        inputArray={{ label: 'Subtasks', buttonLabel: '+ Add New Subtask' }}
        select={{ defaultValue: current, label: 'Status', options, current, getCurrent: (name, id) => setCurrent({ name, id }) }}
        submit='Create Task'
      />
    </Modal>
  )
}

export default AddTask
