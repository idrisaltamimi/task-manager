import React, { useContext, useEffect } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { NoColumns, Column, DashboardLoading } from './'
import './styles/main.css'

const Main = () => {
  const { addColumn } = useContext(PortalContext) as PortalContextType
  const { getBoards, currentBoard, isLoading, boards } = useContext(ActionsContext) as ActionsContextType

  useEffect(() => {
    getBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (isLoading && boards.length < 1) return <DashboardLoading />

  if (boards.length < 1) return <main className='no-columns'><NoColumns disabled={true} /></main>

  if (currentBoard.columns.length < 1) return <main className='no-columns'><NoColumns /></main>

  return (
    <main className='columns'>
      {currentBoard.columns.map((column) => (
        <Column
          key={column._id}
          column={column}
        />
      ))}
      <button className='column add-new-column' onClick={addColumn}>
        + New Column
      </button>
    </main>
  )
}

export default Main
