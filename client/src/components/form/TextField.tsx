import React, { useEffect, useRef } from 'react'

import './styles/textField.css'

interface textField {
  value: string
  error?: boolean
}

interface Props {
  label: string
  placeholder?: string
  required: boolean
  id: string
  textField: textField
  fn?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<Props> = ({
  label,
  placeholder,
  required,
  id,
  textField: { value, error },
  fn
}) => {
  const textfieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!error) return

    if (!textfieldRef.current) return

    textfieldRef.current.focus()
  }, [error])

  const invalidClassName = error ? 'invalid-text textfield-container' : 'textfield-container'

  return (
    <div className='form-control-textfield'>
      <label className='label' htmlFor={id}>{label}</label>
      <div className={`${invalidClassName}`}>
        <input
          id={id}
          className={`text-field`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={fn}
          ref={textfieldRef}
        />
      </div>
    </div>
  )
}

export default TextField
