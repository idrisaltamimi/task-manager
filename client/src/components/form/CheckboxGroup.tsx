import React from 'react'
import uuid from 'react-uuid'

import CheckBox from './CheckBox'
import './styles/checkboxGroup.css'

interface Props {
  label: string
  checkBoxes: Array<string>
}

const CheckboxGroup: React.FC<Props> = ({ label, checkBoxes }) => {
  return (
    <div className='checkbox-group-control'>
      <label className='label'>{label}</label>
      <div className='checkbox-group'>
        {checkBoxes.map((checkBox) => (
          <CheckBox
            key={uuid()}
            label={checkBox}
            id={checkBox}
            value={checkBox}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup