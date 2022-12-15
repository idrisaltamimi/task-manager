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

  const mainClassName = currentBoard.columns.length === 0 ? 'no-columns' : 'columns'

  if (isLoading && boards.length < 1) return <DashboardLoading />

  return (
    <main className={mainClassName}>
      {currentBoard.columns.length > 0 ? (
        <>
          {currentBoard.columns.map((column) => (
            <Column
              key={column._id}
              column={column}
            />
          ))}
          <button className='column add-new-column' onClick={addColumn}>
            + New Column
          </button>
        </>
      ) : (
        <NoColumns />
      )}
    </main>
  )
}

export default Main
