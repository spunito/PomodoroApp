import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PomodoroApp } from './PomodoroApp'
import { PomodoroProvider } from './context/PomodoroContext'



createRoot(document.getElementById('root')).render(
  <PomodoroProvider>
    <StrictMode>
      <PomodoroApp />
    </StrictMode>
  </PomodoroProvider>
)
