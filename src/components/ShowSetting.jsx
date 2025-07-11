import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'
import { usePomodoro } from '../hooks/usePomodoro'

export const ShowSetting = () => {
  const { showSetting, setShowSetting } = useContext(PomodoroContext)
  const { 
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    restartPomodoro
  } = usePomodoro()

  const isInvalidInput = pomodoroTime < 1 || shortBreakTime < 1 || longBreakTime < 1

  return (
    <div>
      {showSetting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Fondo oscuro que bloquea clics al Pomodoro */}
          <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto"></div>

          {/* Caja del modal con las configuraciones */}
          <div className="relative z-10 bg-white rounded-lg p-5 shadow-xl max-w-sm w-full">

            <h1 className="pb-3 border-b-2 text-center text-xl font-semibold">Configuraciones</h1>

            <div className="pt-4 pb-4 space-y-4">
              <div>
                <label className="block mb-1 font-medium">Pomodoro</label>
                <input 
                  type="number" 
                  min={1}  
                  className="inset-shadow-sm inset-shadow-indigo-500 text-center w-full" 
                  value={pomodoroTime} 
                  onChange={(e) => setPomodoroTime(e.target.value)} 
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Short Break</label>
                <input 
                  type="number" 
                  min={1} 
                  className="inset-shadow-sm inset-shadow-indigo-500 text-center w-full" 
                  value={shortBreakTime} 
                  onChange={(e) => setShortBreakTime(e.target.value)} 
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Long Break</label>
                <input 
                  type="number" 
                  min={1} 
                  className="inset-shadow-sm inset-shadow-indigo-500 text-center w-full" 
                  value={longBreakTime} 
                  onChange={(e) => setLongBreakTime(e.target.value)} 
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className={`${isInvalidInput ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'} p-2 rounded-lg text-white transition`}
                onClick={() => setShowSetting(false)}
                disabled={isInvalidInput}
              >
                Exit
              </button>

              <button
                className="bg-red-700 hover:bg-red-800 p-2 rounded-lg text-white transition"
                onClick={restartPomodoro}
              >
                Restart
              </button>
            </div>

            {isInvalidInput && (
              <div className="mt-3 text-center text-sm text-red-500">
                Todos los tiempos deben ser mayores a 0
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  )
}
