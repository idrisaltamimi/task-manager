import React from 'react'
import { cross } from '../../assets'
import TextField from './TextField'

const ListTextField = () => {
  return (
    <div className='group-item'>
      <TextField
        type='text'
        required={false}
        placeholder='e.g. Web Design'
        id='board-name'
        textField={{ value: 'name', error: false }}
      // fn={(e) => setName(e.target.value)}
      />
      <button><img src={cross} alt='' /></button>
    </div>
  )
}

export default ListTextField
