
import React from 'react'
import ReactDOM from 'react-dom'

import './styles/modal.css'

interface Props {
  children: React.ReactElement
  close: () => void
  menu?: boolean
}

const Modal: React.FC<Props> = ({ children, close, menu }) => {
  const overlayRootEl = document.getElementById('portal')

  return (
    overlayRootEl ?
      (ReactDOM.createPortal(
        <>
          <div className={`modal-overlay`} onClick={close} />
          <div className='modal'>{children}</div>
        </>,
        overlayRootEl,
      )
      ) : (
        null)
  )
}

export default Modal