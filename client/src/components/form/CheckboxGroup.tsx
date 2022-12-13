import React from 'react'
import uuid from 'react-uuid'

import { TaskType } from '../../constants'
import { getId } from '../../utils'
import CheckBox from './CheckBox'
import './styles/checkboxGroup.css'

interface Props {
  label: string
  currentTask: TaskType
  handleChange: (id: string) => void
}

const CheckboxGroup: React.FC<Props> = ({ label, currentTask, handleChange }) => {

  return (
    <div className='checkbox-group-control'>
      <label className='label'>{label}</label>
      <div className='checkbox-group'>
        {currentTask.subtasks.map(({ name, isCompleted, _id }) => (
          <CheckBox
            key={uuid()}
            label={name}
            id={getId(_id)}
            value={name}
            isCompleted={isCompleted}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup