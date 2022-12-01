import React, { useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'

import { ActionsContext } from '../../actions'
import { board, darkTheme, lightTheme, hideSidebar } from '../../assets'
import { PortalContext, ThemeContext } from '../../context'
import './styles/sidebar.css'

interface Props {
  sidebarClassName?: string
}

const Sidebar: React.FC<Props> = ({ sidebarClassName }) => {
  const { mode, toggleMode, toggleMenu, hideMenu } = useContext(ThemeContext)
  const { boards, getBoards } = useContext(ActionsContext)
  const { addBoardModal } = useContext(PortalContext)

  const [currentBoard, setCurrentBoard] = useState('')

  useEffect(() => {
    getBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addBoard = async () => {
    addBoardModal()
    hideMenu()
  }

  const currentClassName = (id: string) => currentBoard === id ? 'current' : ''
  const current = (index: number) => (currentBoard === '' && index === 0) ? 'current' : ''

  const togglerClassName = mode ? 'dark' : ''

  return (
    <div className={`${sidebarClassName}`}>
      <label className='label sidebar-label'>ALL BOARDS ({boards.length})</label>

      <div className='buttons-container'>
        {boards.length > 0 && boards.map(({ name, _id }: { name: string, _id: string }, index: number) => (
          <button
            key={uuid()}
            className={`board ${current(index)} ${currentClassName(_id)}`}
            onClick={() => setCurrentBoard(_id)}
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
