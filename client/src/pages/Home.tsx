import React, { useContext, useEffect, useState } from 'react'
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from '../context'
import { ActionsContext, ActionsContextType } from '../actions'
import { AddBoard, AddTask, SubtaskModal } from '../layout/formModals'
import { showSidebarIcon } from '../assets'
import { Header } from '../layout/Header'
import { Main } from '../layout/Main'
import { Intro } from '../layout'

interface tokenType {
  username: string,
  _id: string,
  exp: number,
  iat: number,
}

const Home = () => {
  const navigate = useNavigate()
  const { user, logout, removeUser } = useContext(ActionsContext) as ActionsContextType
  const { boardModal, taskModal, subtaskModal } = useContext(PortalContext) as PortalContextType
  const { toggleMenu } = useContext(ThemeContext) as ThemeContextType

  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode<tokenType>(token)

      if (decodedToken.exp * 24000 < new Date().getTime()) {
        navigate('/auth')
        removeUser()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    logout()

    setTimeout(() => {
      setIntro(false)
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (intro) return <Intro />

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
