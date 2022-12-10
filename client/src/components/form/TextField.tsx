import React, { useEffect, useRef } from 'react'

import './styles/textField.css'

interface textField {
  value: string
  error?: boolean
}

interface Props {
  label?: string
  placeholder?: string
  required: boolean
  autoFocus?: boolean
  id: string
  textField: textField
  fn?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
}

const TextField: React.FC<Props> = ({
  label,
  placeholder,
  required,
  autoFocus = false,
  id,
  textField: { value, error },
  fn,
  type
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
      {label !== '' && <label className='label' htmlFor={id}>{label}</label>}
      <div className={`${invalidClassName}`}>
        <input
          id={id}
          className={`text-field`}
          placeholder={placeholder}
          required={required}
          value={value}
          type={type}
          onChange={fn}
          ref={textfieldRef}
          autoFocus={autoFocus}
          autoComplete='off'
        />
      </div>
    </div>
  )
}

export default TextField
