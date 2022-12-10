import React from 'react'

import { TaskType } from '../../constants'
import './styles/task.css'

const Task: React.FC<TaskType> = ({ title, subtasks }) => {
  const subtasksCompleted = subtasks.filter(i => i.isCompleted === true)

  return (
    <div className='task-container'>
      <h5 className='task-title'>{title}</h5>
      <h6 className='task-subtitle'>{subtasksCompleted.length} of {subtasks.length} subtasks</h6>
    </div>
  )
}

export default Task
