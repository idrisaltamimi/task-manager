import React, { useContext } from 'react'

import { Sidebar } from '../Sidebar'
import { Logo, Button, DropMenu } from '../../components/ui'
import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../../context'
import { ActionsContext, ActionsContextType } from '../../actions'
import { chevronDown, addTaskMobile } from '../../assets'
import './header.css'

interface Props {
}

const Header: React.FC<Props> = () => {
  const { showSidebar, hideMenu, toggleMenu } = useContext(ThemeContext) as ThemeContextType
  const { currentBoard } = useContext(ActionsContext) as ActionsContextType
  const { addTaskModal } = useContext(PortalContext) as PortalContextType

  const sidebarClassName = showSidebar ? 'show sidebar' : 'hide sidebar'
  const sidebarMenuClassName = showSidebar ? 'rotate-arrow' : 'arrow-down'
  const overlay = showSidebar ? 'overlay' : 'hide-overlay'



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
            fn={addTaskModal}
          />
        </div>

        <DropMenu
          board={true}
        />

      </div>
    </header>
  )
}

export default Header
