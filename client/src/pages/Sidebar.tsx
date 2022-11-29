import React, { useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'

import { ActionsContext } from '../actions/actionsContext'
import { board, darkTheme, lightTheme, hideSidebar } from '../assets'
import { PortalContext } from '../context/PortalContext'
import { ThemeContext } from '../context/ThemeContext'
import './styles/sidebar.css'

interface Props {
  sidebarClassName?: string
}

const Sidebar: React.FC<Props> = ({ sidebarClassName }) => {
  const { mode, toggleMode, toggleMenu } = useContext(ThemeContext)
  const { boards, getBoards, createBoard } = useContext(ActionsContext)
  const { addBoardModal } = useContext(PortalContext)

  const [currentBoard, setCurrentBoard] = useState('')

  useEffect(() => {
    getBoards()
  }, [])

  const addBoard = async () => {
    await createBoard({ newBoard: 'third board' })
    getBoards()
  }

  const currentClassName = (id: string) => currentBoard === id ? 'current' : ''
  const current = (index: number) => (currentBoard === '' && index === 0) ? 'current' : ''

  const togglerClassName = mode ? 'dark' : ''

  return (
    <div className={`${sidebarClassName}`}>
      <label className='label sidebar-label'>ALL BOARDS ({boards.length})</label>

      <div className='buttons-container'>
        {/* {boards.length > 0 && boards.map(({ name, _id }: { name: string, _id: string }, index: number) => (
          <button
            key={uuid()}
            className={`board ${current(index)} ${currentClassName(_id)}`}
            onClick={() => setCurrentBoard(_id)}
            disabled={!showSidebar}
          >
            <img src={board} alt='' className='board-logo' />
            {name}
          </button>
        )
        )} */}
        {['board1', 'board2', 'board3'].map((item, index) => (
          <button
            key={uuid()}
            className={`board ${current(index)} ${currentClassName(item)}`}
            onClick={() => setCurrentBoard(item)}
          >
            <img src={board} alt='' className='board-logo' />
            {item}
          </button>
        )
        )}

        <button className='board' onClick={() => addBoardModal()}>
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
