import React, { useContext, useEffect } from 'react'

import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../context'
import { ActionsContext, ActionsContextType } from '../actions'
import { AddBoard, AddTask, SubtaskModal } from '../layout/formModals'
import { showSidebarIcon } from '../assets'
import { Header } from '../layout/Header'
import { Main } from '../layout/Main'

const Home = () => {
  const { checkIfTokenExpired } = useContext(ActionsContext) as ActionsContextType
  const { boardModal, taskModal, subtaskModal } = useContext(PortalContext) as PortalContextType
  const { toggleMenu } = useContext(ThemeContext) as ThemeContextType

  useEffect(() => {
    checkIfTokenExpired()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
