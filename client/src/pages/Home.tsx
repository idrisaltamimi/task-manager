import React, { useContext } from 'react'

import { PortalContext } from '../context/PortalContext'
import { AddBoard } from './form'
import './styles/home.css'

const Home = () => {
  const { boardModal } = useContext(PortalContext)

  return (
    <main>
      {boardModal && <AddBoard />}
    </main>
  )
}

export default Home
