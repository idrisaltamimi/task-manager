import { createContext, ReactElement, useEffect, useState } from 'react'

import { logoDark, logoLight } from '../assets'

interface ThemeContextType {
  currentLogo: string
  toggleMode: () => void
  mode: boolean
  showSidebar: boolean
  setShowSidebar: React.SetStateAction<boolean>
  hideMenu: () => void
  toggleMenu: () => void
}

const ThemeContext = createContext<ThemeContextType | any>(null)

const ThemeContextProvider = ({ children }: { children: ReactElement }) => {
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
