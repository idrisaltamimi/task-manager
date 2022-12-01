import React, { useContext } from 'react'

import { logoMobile } from '../../assets'
import { ThemeContext } from '../../context'

const Logo = () => {
  const { currentLogo } = useContext(ThemeContext)

  return (
    <picture className='logo'>
      <source srcSet={logoMobile} media='(max-width: 599px)' />
      <img src={currentLogo} alt='logo' />
    </picture>
  )
}

export default Logo