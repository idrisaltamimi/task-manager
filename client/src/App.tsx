import React, { useEffect, useState } from 'react'

import { CheckBox, Select, TextField } from './components/form'
import { Button } from './components/ui'

export default function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState('')
  const [form, setForm] = useState({
    textField: { value: '', error: false }
  })

  const toggleMode = () => {
    toggleDarkMode === '' ? setToggleDarkMode('dark-mode') : setToggleDarkMode('')
  }

  useEffect(() => {
    document.body.className = toggleDarkMode
  }, [toggleDarkMode])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setForm({ ...form, textField: { value: value, error: false } })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.textField.value === '') {
      setForm({ ...form, textField: { value: '', error: true } })
    }
  }

  return (
    <div className={toggleDarkMode}>
      <h1>App</h1>

      <h2>buttons</h2>
      <div>
        <Button
          text='toggle'
          theme='main'
          size='large'
          fn={toggleMode}
        />
        <Button
          text='toggle'
          theme='secondary'
          size='large'
          fn={toggleMode}
        />
        <Button
          text='toggle'
          theme='red'
          size='small'
          fn={toggleMode}
        />
      </div>

      <div className='modal'>
        <CheckBox
          label='Completed'
          id='1'
          value='1'
        />
      </div>

      <div style={{ padding: '1em' }}>
        <Select
          defaultValue='Doing'
          options={['Todo', 'Doing', 'Done']}
          label='Dropdown (Idle)'
        />
      </div>

      <form onSubmit={onSubmit}>
        <TextField
          id='textField'
          label='Text Field (Idle)'
          placeholder='Enter Task Name'
          required={false}
          textField={form.textField}
          fn={handleChange}
        />
        <Button
          text='submit'
          theme='red'
          size='small'
        />
      </form>
    </div>
  )
}