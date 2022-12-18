import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ActionsContextProvider } from './actions'
import { ThemeContextProvider, PortalContextProvider } from './context'
import './index.css'
import { Intro } from './layout'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
    <Suspense fallback={<Intro />}>
      <Router>
        <ActionsContextProvider>
          <ThemeContextProvider>
            <PortalContextProvider>
              <App />
            </PortalContextProvider>
          </ThemeContextProvider>
        </ActionsContextProvider>
      </Router>
    </Suspense>
  </StrictMode>
)
