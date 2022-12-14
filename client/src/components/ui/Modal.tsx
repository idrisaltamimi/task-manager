
import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'

import './styles/modal.css'

interface Props {
  children: React.ReactElement
  close: () => void
  newClass?: boolean
  element?: ReactElement
  menu?: boolean
  toggleMenu?: () => void
}

const Modal: React.FC<Props> = ({ children, close, newClass, element, menu = false, toggleMenu }) => {
  const overlayRootEl = document.getElementById('portal')

  const containerClassName = newClass ? 'modal modal-container' : 'modal'

  return (
    overlayRootEl ?
      (ReactDOM.createPortal(
        <>
          <div className={`modal-overlay`} onClick={close} />
          <div className={containerClassName}>{children}</div>
        </>,
        overlayRootEl,
      )
      ) : (
        null)
  )
}

export default Modal