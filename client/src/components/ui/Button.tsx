import React from 'react'

import './button.css'

interface Props {
  text: string
  theme: string
  size: string
  fn?: () => void
}

const Button: React.FC<Props> = ({ text, theme, fn, size }) => {

  return (
    <button
      className={`btn ${theme} ${size}`}
      onClick={fn}
    >
      {text}
    </button>
  )
}

export default Button
