import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { CheckboxGroup, ListTextField, Select, TextArea, TextField } from './'
import { Button } from '../ui'

import './styles/modalForm.css'
import { ActionsContext } from '../../actions/actionsContext'
import { PortalContext } from '../../context/PortalContext'
import { CREATE_BOARD } from '../../constants'

interface Props {
  title: string
  paragraph?: string
  textInput?: { id: string, label: string, placeholder: string }
  textArea?: { id: string, label: string, placeholder: string }
  select?: { defaultValue: string, label: string, options: Array<string> }
  checkbox?: { label: string, checkBoxes: Array<string> }
  submit: string
  action: string
}

const ModalForm: React.FC<Props> = ({
  title,
  paragraph,
  textInput,
  submit,
  textArea,
  select,
  checkbox,
  action
}) => {
  const { createBoard } = useContext(ActionsContext)
  const { closeModal } = useContext(PortalContext)

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [description, setDescription] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (name === '') return setNameError(true)

    switch (action) {
      case CREATE_BOARD:
        await createBoard({ name: name })
        break

      default:
        break
    }

    closeModal()
  }

  const textfieldChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setName(target.value)

    if (name !== '') setNameError(false)
  }

  return (
    <form className='modal-form' onSubmit={onSubmit}>
      <h2 className='modal-title'>{title}</h2>

      {paragraph && <p className='modal-paragraph'>{paragraph}</p>}

      {textInput && <TextField
        type='text'
        required={false}
        label={textInput.label}
        id={textInput.id}
        placeholder={textInput.placeholder}
        textField={{ value: name, error: nameError }}
        fn={textfieldChange}
      />}

      {textArea && <TextArea
        id={textArea.id}
        label={textArea.label}
        value={description}
        placeholder={textArea.placeholder}
        fn={(e) => setDescription(e.target.value)}
      />}

      {/* <div className='add-columns-container'>
        <label className='label'>Board Columns</label>
        <div className='group-items'>
          <ListTextField />
          <Button
            text='+ Add New Column'
            size='small'
            theme='addButton'
            fullWidth={true}
            type='button'
          />
        </div>
      </div> */}

      {select && <Select
        defaultValue={select.defaultValue}
        options={select.options}
        label={select.label}
      />}

      {checkbox && <CheckboxGroup
        label={checkbox.label}
        checkBoxes={checkbox.checkBoxes}
      />}

      <Button
        text={submit}
        size='small'
        theme='main'
        fullWidth={true}
        type='submit'
      />
    </form>
  )
}

export default ModalForm
