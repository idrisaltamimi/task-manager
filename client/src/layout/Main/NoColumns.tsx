import React, { useContext } from 'react'

import { PortalContext, PortalContextType } from '../../context'
import { Button } from '../../components/ui'

import './styles/noColumns.css'

const NoColumns = () => {
  const { addBoardModal, updateBoardModal } = useContext(PortalContext) as PortalContextType

  const addColumn = async () => {
    addBoardModal()
    updateBoardModal()
  }

  return (
    <div className='no-columns-container'>
      <h3 className='no-columns-overline'>This board is empty. Create a new column to get started.</h3>
      <Button
        text='+ Add New Column'
        size='large'
        theme='main'
        fn={addColumn}
      />
    </div>
  )
}

export default NoColumns
