import { ChangeEvent, useState } from 'react'

const useForm = (title: string, inputArray: Array<any>) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [name, setName] = useState(title)
  const [nameError, setNameError] = useState(false)
  const newInputArray = inputArray.map((item) => ({ ...item, error: false, new: false }))
  const [inputList, setInputList] = useState(newInputArray)

  const startLoading = () => setSubmitLoading(true)
  const endLoading = () => setSubmitLoading(false)

  const emptyInputError = () => setNameError(true)
  const emptyInputsError = () => {
    setInputList(prev => {
      return prev.map(item => item.name === '' ? { ...item, error: true } : item)
    })
  }

  const textfieldChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setName(target.value)

    if (name !== '') setNameError(false)
  }

  return {
    name,
    nameError,
    inputList,
    submitLoading,
    setInputList,
    textfieldChange,
    startLoading,
    endLoading,
    emptyInputError,
    emptyInputsError,
  }
}

export default useForm
