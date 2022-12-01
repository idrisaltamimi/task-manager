import React, { useContext } from 'react'

import { chevronDown, addTaskMobile, verticalEllipsis } from '../../assets'
import { ThemeContext } from '../../context'
import { Logo, Button } from '../../components/ui'
import { Sidebar } from '../Sidebar'
import './header.css'

interface Props {
}

const Header: React.FC<Props> = () => {
  const { showSidebar, hideMenu, toggleMenu } = useContext(ThemeContext)

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
        <Button
          theme='main'
          text={<img src={addTaskMobile} alt='' />}
          size='x-small'
        />
        <Button
          theme='main'
          text='+ Add New Task'
          size='large'
        />
        <button className='edit-btn'><img src={verticalEllipsis} alt='' /></button>
      </div>
    </header>
  )
}

export default Header
