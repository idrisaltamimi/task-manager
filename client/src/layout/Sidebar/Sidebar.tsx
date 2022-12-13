import React, { useContext } from 'react'
import uuid from 'react-uuid'

import { ActionsContext, ActionsContextType } from '../../actions'
import { board, darkTheme, lightTheme, hideSidebar } from '../../assets'
import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../../context'
import { getId } from '../../utils'
import './styles/sidebar.css'

interface Props {
  sidebarClassName?: string
}

const Sidebar: React.FC<Props> = ({ sidebarClassName }) => {
  const { mode, toggleMode, toggleMenu, hideMenu } = useContext(ThemeContext) as ThemeContextType
  const { boards, currentBoard, getCurrentBoard } = useContext(ActionsContext) as ActionsContextType
  const { addBoardModal } = useContext(PortalContext) as PortalContextType

  const currentClassName = (id: string) => currentBoard._id === id ? 'current' : ''

  const togglerClassName = mode ? 'dark' : ''

  const addBoard = () => {
    addBoardModal()
    hideMenu()
  }

  const changeId = (id: string) => {
    getCurrentBoard(id)
    hideMenu()
  }

  return (
    <div className={`${sidebarClassName}`}>
      <label className='label sidebar-label'>ALL BOARDS ({boards.length})</label>

      <div className='buttons-container'>
        {boards.length > 0 && boards.map(({ name, _id }) => (
          <button
            key={uuid()}
            className={`board ${currentClassName(getId(_id))}`}
            onClick={() => changeId(getId(_id))}
          >
            <img src={board} alt='' className='board-logo' />
            {name}
          </button>
        )
        )}
        <button className='board' onClick={addBoard}>
          <img src={board} alt='' className='board-logo' />
          + Create New Board
        </button>
      </div>

      <button className='mode-toggler' onClick={() => toggleMode()}>
        <img src={lightTheme} alt='' />
        <div className='toggler'>
          <div className={`circle ${togglerClassName}`} />
        </div>
        <img src={darkTheme} alt='' />
      </button>

      <button className='hide-sidebar-btn' onClick={() => toggleMenu()} >
        <img src={hideSidebar} alt='' />
        Hide Sidebar
      </button>
    </div>
  )
}

export default Sidebar
