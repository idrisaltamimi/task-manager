import React from 'react'

import { check } from '../../assets'
import './styles/checkBox.css'

interface Props {
  label: string
  id: string
  value: string
  isCompleted: boolean
  handleChange: (id: string) => void
}

const CheckBox: React.FC<Props> = ({ label, id, value, isCompleted, handleChange }) => {
  const checkedLabel = isCompleted ? 'label-text checked-label' : 'label-text'



  return (
    <label htmlFor={id} className='form-control-checkbox'>
      <div className='checkbox-input-container'>
        <input
          id={id}
          checked={isCompleted}
          className='checkbox-input'
          type='checkbox'
          value={value}
          onChange={() => handleChange(id)}
        />
        <img src={check} alt='' className='check' />
      </div>
      <span className={checkedLabel}>{label}</span>
    </label>
  )
}

export default CheckBox
