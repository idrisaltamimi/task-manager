import { useContext } from 'react'

import Home from './pages/Home'
import { Header } from './components'
import { ThemeContext } from './context/ThemeContext'
import { showSidebarIcon } from './assets'
import './app.css'

export default function App() {
  const { showSidebar, toggleMenu } = useContext(ThemeContext)

  const sidebarControlClassName = showSidebar ? 'hide-sidebar' : 'show-sidebar'

  return (
    <div className={sidebarControlClassName}>
      <Header />
      <Home />
      <button className='show-sidebar-btn' onClick={toggleMenu}>
        <img src={showSidebarIcon} alt='' />
      </button>
    </div>
  )
}