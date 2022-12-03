import { useContext } from 'react'

import { Header } from './layout/Header'
import { PortalContext, PortalContextType, ThemeContext, ThemeContextType } from './context'
import { showSidebarIcon } from './assets'
import { Main } from './layout/Main'
import { AddBoard } from './layout/formModals'
import './app.css'

export default function App() {
  const { boardModal } = useContext(PortalContext) as PortalContextType
  const { showSidebar, toggleMenu } = useContext(ThemeContext) as ThemeContextType

  const sidebarControlClassName = showSidebar ? 'hide-sidebar' : 'show-sidebar'

  return (
    <div className={sidebarControlClassName}>
      <Header />

      <Main />

      <button className='show-sidebar-btn' onClick={toggleMenu}>
        <img src={showSidebarIcon} alt='' />
      </button>

      {boardModal && <AddBoard />}
    </div>
  )
}