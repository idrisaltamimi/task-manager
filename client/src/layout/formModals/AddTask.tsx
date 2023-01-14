import React, { FormEvent, useContext, useState } from 'react'
import uuid from 'react-uuid'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { Select, TextArea, TextField, TextfieldGroup } from '../../components/form'
import { Button, Modal, Processing } from '../../components/ui'
import { useForm } from '../../hooks'
import { getId } from '../../utils'
import './styles/modalForm.css'

const AddTask = () => {
  const { currentBoard, currentColumn, currentTask, updateBoard } = useContext(ActionsContext) as ActionsContextType
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

  const currentTaskStatus = currentColumn._id === '' ?
    { _id: getId(currentBoard.columns[0]._id), name: currentBoard.columns[0].name } :
    { _id: getId(currentColumn._id), name: currentColumn.name }

  const [current, setCurrent] = useState(currentTaskStatus)
  const [description, setDescription] = useState(editTask ? currentTask.description : '')
  const [menu, setMenu] = useState(false)

  const toggleMenu = () => setMenu(prev => !prev)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (name === '') return emptyInputError()

    if (!inputList.every(item => item.name !== '')) return emptyInputsError()

    startLoading()

    const subtasks = inputList.map(({ name, isCompleted }) => ({ name, isCompleted: isCompleted || false }))
    const newTask = { name, description, status: current.name, subtasks }

    if (editTask) {
      const newTasks = currentColumn.tasks?.map((item) => (
        item._id === currentTask._id ? { ...item, ...newTask } : item
      ))

      const oldTasks = currentColumn.tasks?.filter(({ _id }) => _id !== currentTask._id)

      const newColumns = currentBoard.columns.map((item) => (
        (item._id === currentColumn._id && currentColumn._id !== current._id) ? { ...item, tasks: oldTasks } :
          item._id === current._id ? { ...item, tasks: newTasks } : item
      ))

      await updateBoard({ ...currentBoard, columns: newColumns })

    } else {
      const newColumns = currentBoard.columns
      await newColumns.forEach(({ _id, tasks }) => current._id === _id && tasks?.push(newTask))
      await updateBoard({ ...currentBoard, columns: newColumns })
    }

    endLoading()
    closeModal()
  }

  return (
    <Modal close={closeModal} menu={menu}>
      <form className='modal-form' onSubmit={onSubmit}>
        <h2 className='modal-title'>{editTask ? 'Edit Task' : 'Add New Task'}</h2>
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
          label='Subtasks'
          buttonValue='+ Add New Subtask'
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
          menu={menu}
          toggleMenu={toggleMenu}
        />
        <Button
          text={submitLoading ? <Processing color='white' /> : editTask ? 'Save Changes' : 'Create Task'}
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
