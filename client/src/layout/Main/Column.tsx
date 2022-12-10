import React from 'react'

import { ColumnType } from '../../constants'
import { Task } from './'
import './styles/column.css'

interface Props {
  column: ColumnType
}

const Column: React.FC<Props> = ({ column }) => {
  return (
    <div className='column'>
      <h4 className='column-name'><div className='column-color-circle' />
        {column.name} ({column.tasks?.length})
      </h4>
      {column.tasks?.length === 0 ? (
        <button className='empty-column'>
          + Add Task
        </button>
      ) : (
        <div className='tasks-container'>
          {column.tasks?.map((task) => (
            <Task key={task._id} {...task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Column
