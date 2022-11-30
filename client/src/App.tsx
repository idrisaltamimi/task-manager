import { useContext } from 'react'

import { Header } from './layout/Header'
import { ThemeContext } from './context/ThemeContext'
import { showSidebarIcon } from './assets'
import { Main } from './layout/Main'
import './app.css'

export default function App() {
  const { showSidebar, toggleMenu } = useContext(ThemeContext)

  const sidebarControlClassName = showSidebar ? 'hide-sidebar' : 'show-sidebar'

  return (
    <div className={sidebarControlClassName}>
      <Header />
      <Main />
      <button className='show-sidebar-btn' onClick={toggleMenu}>
        <img src={showSidebarIcon} alt='' />
      </button>
    </div>
  )
}