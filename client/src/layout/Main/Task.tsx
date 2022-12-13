import React, { useContext } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { ColumnType, TaskType } from '../../constants'
import { getId } from '../../utils'
import './styles/task.css'

interface Props {
  name: string
  subtasks: any
  task: TaskType
  column: ColumnType
}

const Task: React.FC<Props> = ({ name, subtasks, task, column }) => {
  const { openSubtaskModal } = useContext(PortalContext) as PortalContextType
  const { getCurrentTask, getCurrentColumn } = useContext(ActionsContext) as ActionsContextType

  const openSubtask = () => {
    openSubtaskModal()
    getCurrentTask(task)
    getCurrentColumn(getId(column._id))
  }

  const subtasksCompleted = subtasks.filter(({ isCompleted }: { isCompleted: boolean }) => isCompleted === true)

  return (
    <button className='task-container' onClick={openSubtask}>
      <h5 className='task-title'>{name}</h5>
      <h6 className='task-subtitle'>{subtasksCompleted.length} of {subtasks.length} subtasks</h6>
    </button>
  )
}

export default Task
