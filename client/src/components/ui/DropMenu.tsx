import React, { useState, useContext } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { verticalEllipsis } from '../../assets'
import './styles/dropMenu.css'

interface Props {
  board?: boolean
  task?: boolean
}

const DropMenu: React.FC<Props> = ({ board = false, task = false }) => {
  const { deleteBoard, updateBoard, currentColumn, currentBoard, currentTask } = useContext(ActionsContext) as ActionsContextType
  const { addColumn, closeModal } = useContext(PortalContext) as PortalContextType

  const [dropMenu, setDropMenu] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const toggleDropMenu = () => setDropMenu(prev => !prev)

  const edit = () => {
    board && addColumn()
    setDropMenu(false)
  }

  const remove = async () => {
    const newTasks = currentColumn.tasks?.filter(({ _id }) => _id !== currentTask._id)
    const newColumns = currentBoard.columns?.map((item) => (
      item._id === currentColumn._id ? { ...item, tasks: newTasks } : item
    ))

    setRemoveLoading(true)
    board && await deleteBoard()
    task && await updateBoard({ ...currentBoard, columns: newColumns })
    setRemoveLoading(false)
    setDropMenu(false)
    closeModal()
  }

  const containerClassName = board ? 'drop-menu' : 'drop-menu drop-menu-task'

  return (
    <div className='drop-menu-container'>
      <button type='button' className='edit-btn' onClick={toggleDropMenu}>
        <img src={verticalEllipsis} alt='' />
      </button>

      {dropMenu && (
        <>
          <div className={containerClassName}>
            <button type='button' onClick={edit}>{board ? 'Edit Board' : 'Edit Task'}</button>
            <button type='button' className='remove-btn' onClick={remove}>
              {board ? 'Delete Board' : 'Delete Task'}
              {removeLoading && <div className='remove-loading' />}
            </button>
          </div>
          <div className='drop-menu-overlay' onClick={() => setDropMenu(false)} />
        </>
      )}
    </div>
  )
}

export default DropMenu
