import React, { useState } from 'react'

import './styles/checkBox.css'

interface Props {
  label: string
  id: string
  value: string
}

const CheckBox: React.FC<Props> = ({ label, id, value }) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(prev => !prev)
  }

  return (
    <label htmlFor={id} className='form-control-checkbox'>
      <input
        id={id}
        checked={checked}
        className='checkbox-input'
        type='checkbox'
        value={value}
        onChange={handleChange}
      />
      <span className='label-text'>{label}</span>
    </label>
  )
}

export default CheckBox
