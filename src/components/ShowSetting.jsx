import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'
import { usePomodoro } from '../hooks/usePomodoro'

export const ShowSetting = () => {
    const { showSetting ,setShowSetting } = useContext(PomodoroContext)
    
    const { pomodoroTime,
            setPomodoroTime,
            shortBreakTime,
            setShortBreakTime,
            longBreakTime,
            setLongBreakTime} = usePomodoro();
return (
    <div>
        {showSetting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            
            {/* Fondo oscuro que bloquea clics al Pomodoro */}
            <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto"></div>

              {/* Caja del modal con las configuraciones */}
            <div className="relative z-10 bg-white rounded-lg p-5 shadow-xl">
              <h1 className='pb-3 border-b-2'>Configuraciones</h1>
              <div className='pt-4 pb-4'>

                <p>Pomodoro</p>
                <input type="number" min="1" value={pomodoroTime} onChange={(e) => setPomodoroTime(e.target.value)} />
                <p>Short Break</p>
                <input type="number" min="1" value={shortBreakTime} onChange={(e) => setShortBreakTime(e.target.value)} />
                <p>Long Break</p>
                <input type="number" min="1" value={longBreakTime} onChange={(e) => setLongBreakTime(e.target.value)} />

              </div>
              <button className='bg-red-700 p-1 rounded-lg text-white' onClick={() => setShowSetting(false)}>Salir</button>
            </div>

          </div>
        )}

    
    </div>
  )
}
