import React, { createContext, useEffect, useState } from 'react'

import { logoDark, logoLight } from '../assets'

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const localStorageMode = localStorage.getItem('mode') === 'false' ? false : true
  const [toggleDarkMode, setToggleDarkMode] = useState(localStorageMode || false)

  const toggleMode = () => {
    setToggleDarkMode(prev => {
      localStorage.setItem('mode', String(!prev))
      return !prev
    })
  }

  const modeClassName = toggleDarkMode ? 'dark-mode' : ''

  useEffect(() => {
    document.body.className = modeClassName
  }, [modeClassName])

  const currentLogo = toggleDarkMode ? logoLight : logoDark

  const toggleMenu = () => setShowSidebar((prev) => !prev)
  const hideMenu = () => setShowSidebar(false)

  return (
    <ThemeContext.Provider value={{
      currentLogo,
      toggleMode,
      mode: toggleDarkMode,
      showSidebar,
      setShowSidebar,
      hideMenu,
      toggleMenu
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
