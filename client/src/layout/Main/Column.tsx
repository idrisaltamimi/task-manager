import React, { useContext } from 'react'
import uuid from 'react-uuid'

import { ColumnType } from '../../constants'
import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { getId } from '../../utils'
import { Task } from './'
import './styles/column.css'

interface Props {
  column: ColumnType
}

const Column: React.FC<Props> = ({ column }) => {
  const { addTaskModal } = useContext(PortalContext) as PortalContextType
  const { getCurrentColumn } = useContext(ActionsContext) as ActionsContextType

  const addTask = () => {
    getCurrentColumn(getId(column._id))
    addTaskModal()
  }

  return (
    <div className='column'>
      <h4 className='column-name'><div className='column-color-circle' />
        {column.name} ({column.tasks?.length})
      </h4>
      {column.tasks?.length === 0 ? (
        <button className='empty-column' onClick={addTask}>
          + Add Task
        </button>
      ) : (
        <div className='tasks-container'>
          {column.tasks?.map((task) => (
            <Task
              key={task._id || uuid()}
              column={column}
              task={task}
              {...task}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Column
