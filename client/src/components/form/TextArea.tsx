import React from 'react'

import './styles/textArea.css'

interface Props {
  label: string
  placeholder?: string
  id: string
  value: string
  fn?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<Props> = ({
  label,
  placeholder,
  id,
  value,
  fn
}) => {
  return (
    <div className='form-control-textarea'>
      <label className='label' htmlFor={id}>{label}</label>
      <div className='textarea-container'>
        <textarea
          id={id}
          className='text-field textarea'
          placeholder={placeholder}
          value={value}
          onChange={fn}
        />
      </div>
    </div>
  )
}

export default TextArea
