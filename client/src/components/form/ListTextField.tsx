import React, { useContext, useState } from 'react'

import { cross } from '../../assets'
import { PortalContext } from '../../context'
import TextField from './TextField'

interface Props {
  id: string
}

const ListTextField: React.FC<Props> = ({ id }) => {
  const { getId } = useContext(PortalContext)
  const [text, setText] = useState('')

  return (
    <div className='group-item'>
      <TextField
        type='text'
        required={false}
        placeholder='e.g. Web Design'
        id='board-name'
        textField={{ value: text, error: false }}
        fn={(e) => setText(e.target.value)}
      />
      <button type='button' onClick={() => getId(id)}><img src={cross} alt='' /></button>
    </div>
  )
}

export default ListTextField
