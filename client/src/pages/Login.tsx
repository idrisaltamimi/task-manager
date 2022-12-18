import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionsContext, ActionsContextType } from '../actions'
import { TextField } from '../components/form'
import { Button, Logo, Processing } from '../components/ui'
import './styles/login.css'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, signUp, isLoading, userError, user } = useContext(ActionsContext) as ActionsContextType

  const [userIsSigned, setUserIsSigned] = useState(true)
  const [username, setUsername] = useState({ value: '', error: false })
  const [password, setPassword] = useState({ value: '', error: false })
  const [conformPassword, setConformPassword] = useState({ value: '', error: false })
  const [invalidPassword, setInvalidPassword] = useState(false)

  useEffect(() => {
    if (user) return navigate('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleUser = () => setUserIsSigned(prev => !prev)

  const userChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement
    name === 'username' && setUsername({ value, error: false })
    name === 'password' && setPassword({ value, error: false })
    name === 'conformPassword' && setConformPassword({ value, error: false })

    if (!userIsSigned && conformPassword.value === password.value) {
      setInvalidPassword(false)
    }
  }


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const usernameInvalid = username.value === ''
    const passwordInvalid = password.value === ''
    const conformPasswordInvalid = conformPassword.value === ''

    if (!userIsSigned && (conformPassword.value === '' && conformPassword.value === '')) {
      setInvalidPassword(false)
    }

    if (usernameInvalid || passwordInvalid || (!userIsSigned && conformPasswordInvalid)) {
      usernameInvalid && setUsername({ ...username, error: true })
      passwordInvalid && setPassword({ ...password, error: true })
      conformPasswordInvalid && setConformPassword({ ...conformPassword, error: true })
      return
    }

    if (!userIsSigned && (conformPassword.value !== password.value && conformPassword.value !== '')) {
      setInvalidPassword(true)
      return
    }

    const userData = { username: username.value, password: password.value }



    if (userIsSigned) await signIn(userData)

    if (!userIsSigned) await signUp({ ...userData, confirmPassword: conformPassword.value })
  }

  const passwordError = (password: { value: string, error: boolean }) => password.value !== '' ? invalidPassword : password.error

  return (
    <form className='login' onSubmit={onSubmit}>
      <div className='logo-container'><Logo responsive={false} /></div>
      <TextField
        label='Username'
        id='username'
        name='username'
        type='text'
        textField={username}
        required={false}
        autoFocus
        placeholder='e.g. idrisaltamimi'
        fn={userChange}
      />
      <TextField
        label='Password'
        id='password'
        name='password'
        type='password'
        placeholder='Enter password'
        textField={{ ...password, error: passwordError(password) }}
        required={false}
        fn={userChange}
        passwordAreDifferent={invalidPassword}
      />
      {!userIsSigned &&
        <TextField
          label='Confirm Password'
          id='confirm-password'
          name='conformPassword'
          type='password'
          placeholder='Confirm password'
          textField={{ ...conformPassword, error: passwordError(conformPassword) }}
          required={false}
          fn={userChange}
          passwordAreDifferent={invalidPassword}
        />
      }

      <Button
        text={isLoading ? <Processing color='white' /> : (userIsSigned ? 'Login' : 'Sign Up')}
        size='small'
        theme='main'
      />
      <div>
        {userError && <h6 className='no-account color-red'>{userError?.response.data.message}</h6>}
        <h6 className='no-account'>
          {userIsSigned ? 'Don\'t have an account' : 'Already have an account'}
          <button type='button' className='no-account-btn' onClick={toggleUser}>{userIsSigned ? 'Sign up' : 'Login'}</button>
        </h6>
      </div>
    </form>
  )
}

export default Login