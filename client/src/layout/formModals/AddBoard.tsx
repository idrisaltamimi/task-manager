import React, { FormEvent, useContext } from 'react'
import uuid from 'react-uuid'

import { Button, Modal } from '../../components/ui'
import { TextField, TextfieldGroup } from '../../components/form'
import { PortalContext, PortalContextType } from '../../context'
import { ActionsContext, ActionsContextType } from '../../actions'
import { useForm } from '../../hooks'
import { getId } from '../../utils'
import './styles/modalForm.css'

const AddBoard = () => {
  const { createBoard, currentBoard, updateBoard, user } = useContext(ActionsContext) as ActionsContextType
  const { closeModal, editBoard } = useContext(PortalContext) as PortalContextType
  const {
    name,
    nameError,
    inputList,
    submitLoading,
    setInputList,
    textfieldChange,
    emptyInputError,
    emptyInputsError,
    startLoading,
    endLoading,
  } = useForm(
    editBoard ? currentBoard.name : '',
    editBoard ? currentBoard.columns : [{ name: '', error: false, _id: uuid() }]
  )

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (name === '') return emptyInputError()

    if (!inputList.every(item => item.name !== '')) return emptyInputsError()

    const inputColumnsArray = inputList.map(({ name }) => ({ name }))

    startLoading()

    if (editBoard) {
      const newBoard = await currentBoard.columns.map((item) => {
        const current = inputList?.find(({ _id }) => _id === item._id)
        return current === undefined ? undefined : { ...current, name: current.name }
      }).filter(item => item !== undefined)

      await inputList.forEach((item) => item.new && newBoard.push({ name: item.name }))

      await updateBoard({ ...currentBoard, name: name, columns: newBoard })
    }
    else {
      await createBoard({ name, columns: inputColumnsArray, userId: getId(user?.result._id) })
    }

    endLoading()
    closeModal()
  }

  return (
    <Modal close={closeModal}>
      <form className='modal-form' onSubmit={onSubmit}>
        <h2 className='modal-title'>{editBoard ? 'Edit Board' : 'Add New Board'}</h2>
        <TextField
          type='text'
          required={false}
          label='Board Name'
          id={editBoard ? 'new-board' : 'edit-board'}
          placeholder='e.g. Web Design'
          textField={{ value: name, error: nameError }}
          autoFocus={name === ''}
          fn={textfieldChange}
        />

        <TextfieldGroup
          buttonValue='+ Add New Column'
          placeholder={['e.g. Todo', 'e.g. Doing', 'e.g. Done']}
          inputList={inputList}
          setInputList={setInputList}
          name={name}
        />

        <Button
          text={submitLoading ? <div className='submit-loading' /> : editBoard ? 'Save Changes' : 'Create New Board'}
          size='small'
          theme='main'
          fullWidth={true}
          type='submit'
        />
      </form>
    </Modal>
  )
}

export default AddBoard
