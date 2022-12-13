import React, { ChangeEvent, SetStateAction } from 'react'
import uuid from 'react-uuid'

import { cross } from '../../assets'
import { Button } from '../ui'
import TextField from './TextField'

interface Props {
  buttonValue: string
  name: string
  placeholder: string[]
  inputList: Array<any>
  setInputList: SetStateAction<any>
}

const TextfieldGroup: React.FC<Props> = ({ buttonValue, placeholder, inputList, setInputList, name: title }) => {
  const addInput = () => {
    const _id = uuid()
    setInputList((prev: any) => [
      ...prev,
      { name: '', _id, error: false, new: true }
    ])
  }

  const removeInput = (_id: string) => {
    setInputList((prev: any) => prev.filter((item: any) => item._id !== _id))
  }

  const inputListChange = (e: ChangeEvent, id: string) => {
    const target = e.target as HTMLInputElement

    const index = inputList.findIndex((object: { name: string, _id: string }) => {
      return object._id === id
    })

    setInputList((prev: any) => {
      const newArray = prev.slice()
      newArray[index].name = target.value
      newArray[index].error = target.value !== '' && false

      return newArray
    })
  }

  const currentPlaceholder = (index: number) =>
    index === 0 ?
      placeholder[0] :
      index === 1 ?
        placeholder[1] :
        placeholder.length > 2 && index === 2 ?
          placeholder[2] : ''

  return (
    <div className='add-columns-container'>
      <label className='label'>Columns</label>
      <div className='group-items'>
        {inputList.map(({ name, _id, error }: { name: string, _id: string, error: boolean }, index) => (
          <div key={_id} className='group-item'>
            <TextField
              type='text'
              required={false}
              placeholder={currentPlaceholder(index)}
              id={_id}
              textField={{ value: name, error: error }}
              autoFocus={title !== '' && name === ''}
              fn={(e: ChangeEvent) => inputListChange(e, _id)}
            />
            <button type='button' onClick={() => removeInput(_id)}>
              <img src={cross} alt='' />
            </button>
          </div>
        ))}
        <Button
          text={buttonValue}
          size='small'
          theme='addButton'
          fullWidth={true}
          type='button'
          fn={addInput}
        />
      </div>
    </div>
  )
}

export default TextfieldGroup
