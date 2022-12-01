import React, { useContext } from 'react'

import { PortalContext } from '../../context'
import { AddBoard } from './'
import './styles/home.css'

const Main = () => {
  const { boardModal } = useContext(PortalContext)

  return (
    <main>
      {boardModal && <AddBoard />}
    </main>
  )
}

export default Main
