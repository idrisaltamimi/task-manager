import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Logo } from '../components/ui'

import './styles/notFound.css'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='not-found'>
      <div className='not-found-logo'><Logo responsive={false} /></div>
      <h1 className='not-found-title'>404 Error,</h1>
      <p className='not-found-text'>
        Something went wrong, the page you're looking for doesn't exist. Return to Home page
      </p>
      <div className='not-found-btn'>
        <Button
          text='Home Page'
          theme='main'
          size='small'
          fn={() => navigate('/home')}
        />
      </div>
    </div>
  )
}

export default NotFound
