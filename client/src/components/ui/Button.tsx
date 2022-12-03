import React from 'react'

import './styles/button.css'

interface Props {
  type?: string
  text: any
  theme?: string
  size: string
  fullWidth?: boolean
  disable?: boolean
  fn?: () => void
}

const Button: React.FC<Props> = ({ text, theme, fn, size, fullWidth, type, disable }) => {
  const fullWidthClassName = fullWidth ? 'full-width' : ''
  const buttonType = type === 'button' ? 'button' : 'submit'
  return (
    <button
      className={`btn ${theme} ${size} ${fullWidthClassName}`}
      onClick={fn}
      type={buttonType}
      disabled={disable}
    >
      {text}
    </button>
  )
}

export default Button
