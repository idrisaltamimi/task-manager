
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { PortalContext } from '../../context'

import './styles/modal.css'

interface Props {
  children: React.ReactElement
}

const Modal: React.FC<Props> = ({ children }) => {
  const { closeModal } = useContext(PortalContext)
  const overlayRootEl = document.getElementById('portal')

  return (
    overlayRootEl ?
      (ReactDOM.createPortal(
        <>
          <div className={`modal-overlay`} onClick={closeModal} />
          <div className='modal'>
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