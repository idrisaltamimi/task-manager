import React, { useContext, useEffect } from 'react'

import { ActionsContext, ActionsContextType } from '../../actions'
import { NoColumns, Column, DashboardLoading } from './'
import './styles/main.css'

const Main = () => {
  const { getBoards, currentBoard, isLoading, boards } = useContext(ActionsContext) as ActionsContextType

  useEffect(() => {
    getBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mainClassName = currentBoard.columns.length === 0 ? 'no-columns' : 'columns'

  if (isLoading && boards.length === 0) return <DashboardLoading />

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
          <button className='column add-new-column'>
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
