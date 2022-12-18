import React, { useState, useContext } from 'react'

import { PortalContext, PortalContextType } from '../../context'
import { verticalEllipsis } from '../../assets'
import './styles/dropMenu.css'

interface Props {
  board?: boolean
  task?: boolean
  disabled?: boolean
}

const DropMenu: React.FC<Props> = ({ board = false, task = false, disabled = false }) => {
  const { addColumn, closeModal, editTaskModal, openDeleteModal } = useContext(PortalContext) as PortalContextType
  const [dropMenu, setDropMenu] = useState(false)

  const toggleDropMenu = () => setDropMenu(prev => !prev)

  const edit = () => {
    board && addColumn()
    if (task) {
      closeModal()
      editTaskModal()
    }
    setDropMenu(false)
  }

  const remove = () => {
    openDeleteModal(board, task)
    setDropMenu(false)
  }

  const containerClassName = board ? 'drop-menu' : 'drop-menu drop-menu-task'

  return (
    <div className='drop-menu-container'>
      <button type='button' disabled={disabled} className='edit-btn' onClick={toggleDropMenu}>
        <img src={verticalEllipsis} alt='' />
      </button>

      {dropMenu && (
        <>
          <div className={containerClassName}>
            <button type='button' onClick={edit}>{board ? 'Edit Board' : 'Edit Task'}</button>
            <button type='button' className='remove-btn' onClick={remove}>
              {board ? 'Delete Board' : 'Delete Task'}
            </button>
          </div>
          <div className='drop-menu-overlay' onClick={() => setDropMenu(false)} />
        </>
      )}
    </div>
  )
}

export default DropMenu
