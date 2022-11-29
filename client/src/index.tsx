import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { ActionsContextProvider } from './actions/actionsContext'
import { ThemeContextProvider } from './context/ThemeContext'
import { PortalContextProvider } from './context/PortalContext'
import './index.css'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
    <ActionsContextProvider>
      <ThemeContextProvider>
        <PortalContextProvider>
          <App />
        </PortalContextProvider>
      </ThemeContextProvider>
    </ActionsContextProvider>
  </StrictMode>
)
