
import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ActionsContext, ActionsContextType } from '../../actions'

import './styles/modal.css'

interface Props {
  children: React.ReactElement
  close: () => void
  menu?: boolean
}

const Modal: React.FC<Props> = ({ children, close, menu }) => {
  const { logout } = useContext(ActionsContext) as ActionsContextType
  const overlayRootEl = document.getElementById('portal')

  useEffect(() => {
    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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