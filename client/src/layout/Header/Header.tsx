import React, { useContext, useState } from 'react'

import { Sidebar } from '../Sidebar'
import { Logo, Button } from '../../components/ui'
import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../../context'
import { ActionsContext, ActionsContextType } from '../../actions'
import { chevronDown, addTaskMobile, verticalEllipsis } from '../../assets'
import './header.css'

interface Props {
}

const Header: React.FC<Props> = () => {
  const { showSidebar, hideMenu, toggleMenu } = useContext(ThemeContext) as ThemeContextType
  const { currentBoard, deleteBoard } = useContext(ActionsContext) as ActionsContextType
  const { addColumn } = useContext(PortalContext) as PortalContextType
  const [dropMenu, setDropMenu] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const toggleDropMenu = () => setDropMenu(prev => !prev)

  const sidebarClassName = showSidebar ? 'show sidebar' : 'hide sidebar'
  const sidebarMenuClassName = showSidebar ? 'rotate-arrow' : 'arrow-down'
  const overlay = showSidebar ? 'overlay' : 'hide-overlay'

  const editBoard = () => {
    addColumn()
    setDropMenu(false)
  }

  const removeBoard = async () => {
    setRemoveLoading(true)
    await deleteBoard()
    setRemoveLoading(false)
    setDropMenu(false)
  }

  return (
    <header className='header'>
      <Logo />

      <div className='line' />

      <Sidebar sidebarClassName={sidebarClassName} />

      <div className={overlay} onClick={hideMenu} />

      <h2 className='subtitle' onClick={toggleMenu}>
        Platform Launch
        <img src={chevronDown} alt='' className={sidebarMenuClassName} />
      </h2>

      <div className='add-task-container'>
        <div className='small-btn'>
          <Button
            theme='main'
            text={<img src={addTaskMobile} alt='' />}
            size='x-small'
            disable={currentBoard.columns.length === 0}
          />
        </div>
        <div className='large-btn'>
          <Button
            theme='main'
            text='+ Add New Task'
            size='large'
            disable={currentBoard.columns.length === 0}
          />
        </div>

        <button className='edit-btn' onClick={toggleDropMenu}>
          <img src={verticalEllipsis} alt='' />
        </button>

        {dropMenu && (
          <>
            <div className='drop-menu'>
              <button type='button' onClick={editBoard}>Edit Board</button>
              <button type='button' className='remove-btn' onClick={removeBoard}>
                Delete Board
                {removeLoading && <div className='remove-loading' />}
              </button>
            </div>
            <div className='drop-menu-overlay' onClick={() => setDropMenu(false)} />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
