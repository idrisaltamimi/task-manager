import React, { useContext } from 'react'

import { Modal } from '../../components/ui'
import { PortalContext, PortalContextType } from '../../context'

const DeleteModal = () => {
  const { closeModal } = useContext(PortalContext) as PortalContextType

  return (
    <Modal close={closeModal}>
      <div>

      </div>
    </Modal>
  )
}

export default DeleteModal
