import React, { useContext, useEffect, useState } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { CheckboxGroup, Select } from '../../components/form'
import { DropMenu, Modal } from '../../components/ui'
import { getId } from '../../utils'
import { BoardType, TaskType } from '../../constants'
import './styles/modalForm.css'

const SubtaskModal = () => {
  const { closeAndPost } = useContext(PortalContext) as PortalContextType
  const { currentTask, setCurrentTask, currentBoard, currentColumn } = useContext(ActionsContext) as ActionsContextType
  const { name, description, subtasks } = currentTask

  const subtasksCompleted = subtasks.filter(({ isCompleted }: { isCompleted: boolean }) => isCompleted === true)
  const options = currentBoard.columns.map(({ name, _id }) => ({ name, _id: getId(_id) }))
  const [current, setCurrent] = useState({ _id: getId(currentColumn._id), name: currentColumn.name })
  const [update, setUpdate] = useState<BoardType>(currentBoard)

  const changeCurrentTask = (id: string) => {
    setCurrentTask((prev: TaskType) => {
      const newSubtasks = prev.subtasks.map((subtask) => (
        subtask._id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
      ))
      return { ...prev, subtasks: newSubtasks }
    })
  }

  const updatedBoard = () => {
    if (current._id !== currentColumn._id) {
      const oldTasks = currentColumn.tasks?.filter(({ _id }) => _id !== currentTask._id)

      const newColumns = currentBoard.columns.map((column) => {
        const oldColumn = { ...currentColumn, tasks: oldTasks }
        const newColumn = { ...column, tasks: [...column.tasks || [], currentTask] }
        return (
          currentColumn._id === column._id ? oldColumn :
            current._id === column._id ? newColumn : column
        )
      })
      return setUpdate({ ...currentBoard, columns: newColumns })
    }
    const newColumns = currentBoard.columns.map((column) => {
      const newTasks = column.tasks?.map((task) => currentTask._id === task._id ? currentTask : task)
      return (
        current._id === column._id ? { ...column, tasks: newTasks } : column
      )
    })

    return setUpdate({ ...currentBoard, columns: newColumns })
  }

  useEffect(() => {
    updatedBoard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTask, current])

  const [menu, setMenu] = useState(false)
  const toggleMenu = () => setMenu(prev => !prev)

  return (
    <Modal close={() => closeAndPost(update)} menu={menu}>
      <form className='modal-form subtasks-modal-form'>
        <div className='subtasks-modal-header'>
          <h2 className='modal-title subtasks-modal-title'>{name}</h2>
          <DropMenu task={true} />
        </div>

        <p className='modal-paragraph'>{description}</p>
        <CheckboxGroup
          label={`Subtasks (${subtasksCompleted.length} of ${subtasks.length})`}
          currentTask={currentTask}
          handleChange={changeCurrentTask}
        />
        <Select
          defaultValue={current.name}
          options={options}
          label={'Current Status'}
          current={current}
          getCurrent={(name, _id) => setCurrent({ name, _id })}
          menu={menu}
          toggleMenu={toggleMenu}
        />
      </form>
    </Modal>
  )
}

export default SubtaskModal
