import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ThemeContext, ThemeContextType } from './context'
import { Home, Login } from './pages'
import './app.css'

export default function App() {
  const { showSidebar } = useContext(ThemeContext) as ThemeContextType

  const sidebarControlClassName = showSidebar ? 'hide-sidebar' : 'show-sidebar'

  return (
    <div className={sidebarControlClassName}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}