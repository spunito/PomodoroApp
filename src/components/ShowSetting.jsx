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
            {
              (showSetting === true) ? 
              <div className=''>
                <div 
                className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 shadow-xl">
                  <h1 className='pb-3 border-b-2'>Configuraciones</h1>
                <div className='flex-row md:col-3 pt-4 pb-4'>
                  
                  <p>Pomodoro</p>
                    <input type="number"
                    value={pomodoroTime}
                    onChange={(e) => setPomodoroTime(e.target.value)}/>

                  <p>Short Break</p>
                    <input type="number"
                    value={shortBreakTime}
                    onChange={(e) => setShortBreakTime(e.target.value)}/>

                  <p>Long Break</p>
                    <input type="number" 
    
                    value={longBreakTime}
                    onChange={(e) => setLongBreakTime(e.target.value)}/>
                  </div>

                  <button 
                  className='cursor-pointer bg-red-700 p-1 rounded-lg text-center'
                  onClick={() => setShowSetting(false)}>Salir</button>
                </div> 
              </div>
                : ' '
        }
        </div>
  )
}
