import React, { useContext } from 'react'
import { usePomodoro } from '../hooks/usePomodoro'
import { PomodoroContext } from '../context/PomodoroContext'

export const Pomodoro = () => {
  const {
    timer,
    isRunning,
    handleReset,
    mode,
    handleRunning,
    handleNotRunning,
    changeMode,
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime
        

  } = usePomodoro()

  const { ShowSetting ,setShowSetting } = useContext(PomodoroContext)
 

  const minutos = Math.floor(timer / 60)
  const segundos = timer % 60
  const txtMinutos =
    minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0')

  return (
    <div
      className={`${
        mode === 'pomodoro'
          ? 'bg-[rgb(186,73,73)]'
          : mode === 'short'
          ? 'bg-[#38858a]'
          : mode === 'long'
          ? 'bg-[#397097]'
          : ''
      } w-full min-h-screen flex items-center justify-center font-mono p-4`}
    >

      {/* Caja Timer */}
      <div
        className={`${
          mode === 'pomodoro'
            ? 'bg-[#C55454]'
            : mode === 'short'
            ? 'bg-[#4B9A9C]'
            : mode === 'long'
            ? 'bg-[#4B7A9C]'
            : ''
        } w-full max-w-[480px] rounded-lg px-6 py-8 shadow-lg`}
      >
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6 text-white text-sm sm:text-base">
          <button
            className={`rounded px-4 py-2 cursor-pointer transition ${
              mode === 'pomodoro' ? 'bg-[#A34444]' : ''
            }`}
            onClick={() => changeMode('pomodoro')}
          >
            Pomodoro
          </button>
          <button
            className={`rounded px-4 py-2 cursor-pointer transition ${
              mode === 'short' ? 'bg-[#3A7D7E]' : ''
            }`}
            onClick={() => changeMode('short')}
          >
            Short Break
          </button>
          <button
            className={`rounded px-4 py-2 cursor-pointer transition ${
              mode === 'long' ? 'bg-[#3B627E]' : ''
            }`}
            onClick={() => changeMode('long')}
          >
            Long Break
          </button>
        </div>

        <p className="text-center text-6xl sm:text-7xl md:text-9xl text-white pb-6">
          {txtMinutos}
        </p>

        <div className="text-center">
          <button
            className={`${
              mode === 'pomodoro'
                ? 'text-[rgb(186,73,73)]'
                : mode === 'short'
                ? 'text-[#38858a]'
                : mode === 'long'
                ? 'text-[#397097]'
                : ''
            } bg-white rounded-lg px-6 py-2 text-lg font-bold transition hover:opacity-90 min-w-[100px]`}
            onClick={isRunning ? handleNotRunning : handleRunning}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
      {
              (ShowSetting === true) ? 
              <div className=''>
                <div 
                className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 shadow-lg">
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
