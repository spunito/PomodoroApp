import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PomodoroApp } from './PomodoroApp'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PomodoroApp />
  </StrictMode>,
)
