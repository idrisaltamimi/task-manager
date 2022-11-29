
import React from 'react'
import ReactDOM from 'react-dom'

import './styles/modal.css'

interface Props {
  children: React.ReactElement
}

const Modal: React.FC<Props> = ({ children }) => {
  const overlayRootEl = document.getElementById('portal')

  return (
    overlayRootEl ?
      (ReactDOM.createPortal(
        <>
          <div className={`overlay`} />
          <div className='model'>
            {children}
          </div>
        </>,
        overlayRootEl,
      )
      ) : (
        null)
  )
}

export default Modal