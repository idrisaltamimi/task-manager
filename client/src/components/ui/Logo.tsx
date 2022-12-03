import React, { useContext } from 'react'

import { logoMobile } from '../../assets'
import { ThemeContext, ThemeContextType } from '../../context'

const Logo = () => {
  const { currentLogo } = useContext(ThemeContext) as ThemeContextType

  return (
    <picture className='logo'>
      <source srcSet={logoMobile} media='(max-width: 599px)' />
      <img src={currentLogo} alt='logo' />
    </picture>
  )
}

export default Logo