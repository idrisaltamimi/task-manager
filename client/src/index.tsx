import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ActionsContextProvider } from './actions'
import { ThemeContextProvider, PortalContextProvider } from './context'
import './index.css'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
    <Router>
      <ActionsContextProvider>
        <ThemeContextProvider>
          <PortalContextProvider>
            <App />
          </PortalContextProvider>
        </ThemeContextProvider>
      </ActionsContextProvider>
    </Router>
  </StrictMode>
)
