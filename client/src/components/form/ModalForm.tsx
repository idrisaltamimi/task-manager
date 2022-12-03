import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import uuid from 'react-uuid'

import { CheckboxGroup, Select, TextArea, TextField } from './'
import { Button } from '../ui'
import { ActionsContext, ActionsContextType } from '../../actions'
import { PortalContext, PortalContextType } from '../../context'
import { CREATE_BOARD, UPDATE_BOARD } from '../../constants'
import './styles/modalForm.css'
import { cross } from '../../assets'
import { getId } from '../../utils'

interface inputListType {
  name: string
  id: string
  error: boolean
}

interface Props {
  title: string
  paragraph?: string
  textInput?: { id: string, label: string, placeholder: string }
  textArea?: { id: string, label: string, placeholder: string }
  select?: { defaultValue: string, label: string, options: Array<string> }
  checkbox?: { label: string, checkBoxes: Array<string> }
  inputArray?: { label: string, buttonLabel: string, }
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
  action,
  inputArray
}) => {
  const { createBoard, currentBoard, updateBoard } = useContext(ActionsContext) as ActionsContextType
  const { closeModal, updateModal } = useContext(PortalContext) as PortalContextType

  const [name, setName] = useState(updateModal ? currentBoard.name : '')
  const [nameError, setNameError] = useState(false)
  const [description, setDescription] = useState('')

  const inputListObject = { name: '', id: uuid(), error: false }
  const newColumn = currentBoard.columns.map(({ name, _id }) => ({ name, id: getId(_id), error: false }))
  const currentInputListObject = (updateModal && currentBoard.columns.length > 0) ? newColumn : [inputListObject]
  const [inputList, setInputList] = useState<inputListType[]>(currentInputListObject)


  const addColumnInput = () => {
    const id = uuid()
    setInputList(prev => [
      ...prev,
      { name: '', id, error: false }
    ])
  }

  const removeInput = (id: string) => {
    setInputList(prev => prev.filter(i => i.id !== id))
  }

  const textfieldChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setName(target.value)

    if (name !== '') setNameError(false)
  }

  const inputListChange = (e: ChangeEvent, id: string) => {
    const target = e.target as HTMLInputElement

    const index = inputList.findIndex((object: { name: string, id: string }) => {
      return object.id === id
    })

    setInputList(prev => {
      const newArray = prev.slice()
      newArray[index].name = target.value
      newArray[index].error = target.value !== '' && false

      return newArray
    })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (name === '') return setNameError(true)

    if (!inputList.every(item => item.name !== '')) {
      return setInputList(prev => {
        return prev.map(item => item.name === '' ? { ...item, error: true } : item)
      })
    }

    const inputColumnsArray = inputList.map(({ name }) => ({ name }))

    switch (action) {
      case CREATE_BOARD:
        await createBoard({ name, columns: inputColumnsArray })
        break
      case UPDATE_BOARD:
        return updateBoard({ name, columns: inputColumnsArray })

      default:
        break
    }

    closeModal()
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

      {inputArray && <div className='add-columns-container'>
        <label className='label'>{inputArray.label}</label>
        <div className='group-items'>
          {inputList.map(({ name, id, error }: { name: string, id: string, error: boolean }) => (
            <div key={id} className='group-item'>
              <TextField
                type='text'
                required={false}
                placeholder=''
                id={id}
                textField={{ value: name, error: error }}
                fn={(e: ChangeEvent) => inputListChange(e, id)}
              />
              <button type='button' onClick={() => removeInput(id)}>
                <img src={cross} alt='' />
              </button>
            </div>
          ))}
          <Button
            text={inputArray.buttonLabel}
            size='small'
            theme='addButton'
            fullWidth={true}
            type='button'
            fn={addColumnInput}
          />
        </div>
      </div>}

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
