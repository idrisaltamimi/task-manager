import React from 'react'

import { ColumnType } from '../../constants'
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
        <div>

        </div>
      )}
    </div>
  )
}

export default Column
