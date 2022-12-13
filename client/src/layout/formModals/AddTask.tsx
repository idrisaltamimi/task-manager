import React, { FormEvent, useContext, useState } from 'react'
import uuid from 'react-uuid'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { Select, TextArea, TextField, TextfieldGroup } from '../../components/form'
import { Button, Modal } from '../../components/ui'
import { useForm } from '../../hooks'
import { getId } from '../../utils'

const AddTask = () => {
  const { currentBoard, currentTask, updateBoard } = useContext(ActionsContext) as ActionsContextType
  const { editTask, closeModal } = useContext(PortalContext) as PortalContextType
  const {
    name,
    nameError,
    inputList,
    submitLoading,
    emptyInputError,
    emptyInputsError,
    setInputList,
    textfieldChange,
    startLoading,
    endLoading,
  } = useForm(
    editTask ? currentTask.name : '',
    editTask ? currentTask.subtasks : [{ _id: uuid(), name: '', isCompleted: false }]
  )

  const options = currentBoard.columns.map(({ name, _id }) => ({ name, _id: getId(_id) }))
  const [current, setCurrent] = useState({ name: options[0].name, _id: options[0]._id })
  const [description, setDescription] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (name === '') return emptyInputError()

    if (!inputList.every(item => item.name !== '')) return emptyInputsError()

    startLoading()

    const subtasks = inputList.map(({ name, isCompleted }) => ({ name, isCompleted: isCompleted || false }))
    const newTask = { name, description, status: current.name, subtasks }
    const newColumns = currentBoard.columns

    if (editTask) {
      return
    } else {
      await newColumns.forEach(({ _id, tasks }) => current._id === _id && tasks?.push(newTask))
      await updateBoard({ ...currentBoard, columns: newColumns })
    }

    endLoading()
    closeModal()
  }

  return (
    <Modal close={closeModal}>
      <form className='modal-form' onSubmit={onSubmit}>
        <h2 className='modal-title'>Add New Task</h2>
        <TextField
          type='text'
          required={false}
          label={'Title'}
          id={'new-task'}
          placeholder={'e.g. Take coffee break'}
          textField={{ value: name, error: nameError }}
          autoFocus={name === ''}
          fn={textfieldChange}
        />
        <TextArea
          id={'task-description'}
          label={'Description'}
          value={description}
          placeholder={"e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."}
          fn={(e) => setDescription(e.target.value)}
        />
        <TextfieldGroup
          buttonValue='+ Add New Column'
          placeholder={['e.g. Make coffee', 'e.g. Drink coffee & smile']}
          inputList={inputList}
          setInputList={setInputList}
          name={name}
        />
        <Select
          defaultValue={current.name}
          options={options}
          label={'Status'}
          current={current}
          getCurrent={(name, _id) => setCurrent({ name, _id })}
        />
        <Button
          text={submitLoading ? <div className='submit-loading' /> : editTask ? 'Save Changes' : 'Create Task'}
          size='small'
          theme='main'
          fullWidth={true}
          type='submit'
        />
      </form>
    </Modal>
  )
}

export default AddTask
