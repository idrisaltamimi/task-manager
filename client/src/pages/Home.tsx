import React, { useContext } from 'react'

import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../context'
import { AddBoard, AddTask, SubtaskModal } from '../layout/formModals'
import { showSidebarIcon } from '../assets'
import { Header } from '../layout/Header'
import { Main } from '../layout/Main'

const Home = () => {
  const { boardModal, taskModal, subtaskModal } = useContext(PortalContext) as PortalContextType
  const { toggleMenu } = useContext(ThemeContext) as ThemeContextType

  return (
    <>
      <Header />

      <Main />

      <button className='show-sidebar-btn' onClick={toggleMenu}>
        <img src={showSidebarIcon} alt='' />
      </button>

      {boardModal && <AddBoard />}

      {taskModal && <AddTask />}

      {subtaskModal && <SubtaskModal />}
    </>
  )
}

export default Home
