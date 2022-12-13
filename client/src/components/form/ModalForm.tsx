import React from 'react'

const ModalForm = () => {
  return (
    <div>

    </div>
  )
}

export default ModalForm


// import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
// import uuid from 'react-uuid'

// import { CheckboxGroup, Select, TextArea, TextField } from './'
// import { Button } from '../ui'
// import { ActionsContext, ActionsContextType } from '../../actions'
// import { PortalContext, PortalContextType } from '../../context'
// import { CREATE_BOARD, CREATE_TASK, UPDATE_BOARD } from '../../constants'
// import './styles/modalForm.css'
// import { cross } from '../../assets'
// import { getId } from '../../utils'

// interface inputListType {
//   name: string
//   id: string
//   error: boolean
// }

// interface selectType {
//   defaultValue: { id: string, name: string }
//   label: string
//   options: { id: string, name: string }[]
//   current: { id: string, name: string }
//   getCurrent: (name: string, id: string) => void
// }

// interface Props {
//   title: string
//   paragraph?: string
//   textInput?: { id: string, label: string, placeholder: string }
//   textArea?: { id: string, label: string, placeholder: string }
//   select?: selectType
//   checkbox?: { label: string }
//   inputArray?: { label: string, buttonLabel: string, }
//   submit?: string
//   action: string
// }

// const ModalForm: React.FC<Props> = ({
//   title,
//   paragraph,
//   textInput,
//   submit,
//   textArea,
//   select,
//   checkbox,
//   action,
//   inputArray
// }) => {
//   const { createBoard, currentBoard, updateBoard, createTask } = useContext(ActionsContext) as ActionsContextType
//   const { closeModal, editBoard } = useContext(PortalContext) as PortalContextType

//   const [name, setName] = useState(editBoard ? currentBoard.name : '')
//   const [nameError, setNameError] = useState(false)
//   const [description, setDescription] = useState('')
//   const [submitLoading, setSubmitLoading] = useState(false)

//   const inputListObject = { name: '', id: uuid(), error: false }
//   const newColumn = currentBoard.columns.map((item) => ({ name, id: getId(item._id), error: false }))
//   const currentInputListObject = (editBoard && currentBoard.columns.length > 0) ? newColumn : [inputListObject]
//   const [inputList, setInputList] = useState<inputListType[]>(currentInputListObject)

//   const startLoading = () => setSubmitLoading(true)
//   const stopLoading = () => setSubmitLoading(true)

//   const addColumnInput = () => {
//     const id = uuid()
//     setInputList(prev => [
//       ...prev,
//       { name: '', id, error: false }
//     ])
//   }

//   const removeInput = (id: string) => {
//     setInputList(prev => prev.filter(i => i.id !== id))
//   }

//   const textfieldChange = (e: ChangeEvent) => {
//     const target = e.target as HTMLInputElement
//     setName(target.value)

//     if (name !== '') setNameError(false)
//   }

//   const inputListChange = (e: ChangeEvent, id: string) => {
//     const target = e.target as HTMLInputElement

//     const index = inputList.findIndex((object: { name: string, id: string }) => {
//       return object.id === id
//     })

//     setInputList(prev => {
//       const newArray = prev.slice()
//       newArray[index].name = target.value
//       newArray[index].error = target.value !== '' && false

//       return newArray
//     })
//   }

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault()

//     if (name === '') return setNameError(true)

//     if (!inputList.every(item => item.name !== '')) {
//       return setInputList(prev => {
//         return prev.map(item => item.name === '' ? { ...item, error: true } : item)
//       })
//     }

//     const inputColumnsArray = inputList.map(({ name }) => ({ name }))
//     const inputColumnsArrayName = inputList.map(({ name }) => name)
//     const inputColumnsArrayIds = inputList.map(({ id }) => id)

//     const inputSubtaskArray = inputList.map(({ name }) => ({ title: name, isCompleted: false }))

//     const newColumns = currentBoard.columns.filter(({ _id, name }) => (
//       !inputColumnsArrayIds.includes(getId(_id)) ||
//       !inputColumnsArrayName.includes(name)
//     ))
//     console.log(newColumns)

//     switch (action) {
//       case CREATE_BOARD:
//         startLoading()
//         await createBoard({ name, columns: inputColumnsArray })
//         stopLoading()
//         break

//       case UPDATE_BOARD:
//         startLoading()
//         await updateBoard({ name, columns: inputColumnsArray })
//         stopLoading()
//         break

//       case CREATE_TASK:
//         startLoading()
//         await createTask(getId(select?.current.id),
//           {
//             title: name,
//             description,
//             status: select?.current.name || '',
//             subtasks: inputSubtaskArray
//           }
//         )
//         stopLoading()
//         break

//       default:
//         break
//     }

//     closeModal()
//   }

//   return (
//     <form className='modal-form' onSubmit={onSubmit}>
//       <h2 className='modal-title'>{title}</h2>

//       {paragraph && <p className='modal-paragraph'>{paragraph}</p>}

//       {textInput && <TextField
//         type='text'
//         required={false}
//         label={textInput.label}
//         id={textInput.id}
//         placeholder={textInput.placeholder}
//         textField={{ value: name, error: nameError }}
//         autoFocus={name === ''}
//         fn={textfieldChange}
//       />}

//       {textArea && <TextArea
//         id={textArea.id}
//         label={textArea.label}
//         value={description}
//         placeholder={textArea.placeholder}
//         fn={(e) => setDescription(e.target.value)}
//       />}

//       {inputArray && <div className='add-columns-container'>
//         <label className='label'>{inputArray.label}</label>
//         <div className='group-items'>
//           {inputList.map(({ name, id, error }: { name: string, id: string, error: boolean }) => (
//             <div key={id} className='group-item'>
//               <TextField
//                 type='text'
//                 required={false}
//                 placeholder=''
//                 id={id}
//                 textField={{ value: name, error: error }}
//                 autoFocus={name !== ''}
//                 fn={(e: ChangeEvent) => inputListChange(e, id)}
//               />
//               <button type='button' onClick={() => removeInput(id)}>
//                 <img src={cross} alt='' />
//               </button>
//             </div>
//           ))}
//           <Button
//             text={inputArray.buttonLabel}
//             size='small'
//             theme='addButton'
//             fullWidth={true}
//             type='button'
//             fn={addColumnInput}
//           />
//         </div>
//       </div>}

//       {checkbox && <CheckboxGroup
//         label={checkbox.label}
//       />}

//       {select && <Select
//         defaultValue={select.defaultValue.name}
//         options={select.options}
//         label={select.label}
//         current={select.current}
//         getCurrent={select.getCurrent}
//       />}

//       {submit && <Button
//         text={submitLoading ? <div className='submit-loading' /> : submit}
//         size='small'
//         theme='main'
//         fullWidth={true}
//         type='submit'
//       />}
//     </form>
//   )
// }

// export default ModalForm
