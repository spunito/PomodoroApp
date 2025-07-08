import React from 'react'
import { usePomodoro } from '../hooks/usePomodoro'

export const Pomodoro = () => {

    const {timer, isRunning , handleReset , handleRunning, handleNotRunning , changeMode} = usePomodoro()
    const minutos = Math.floor(timer/60)
    const segundos = timer % 60
    const txtMinutos = minutos.toString().padStart(2, '0')+ ":" + segundos.toString().padStart(2, '0')
  
    return (

    <div className='bg-[rgb(186,73,73)] w-full h-screen flex flex-col items-center justify-center font-mono'>
        <h1 className="text-white text-4xl font-medium pb-6">PomodoroApp</h1>
          <div className="p-15 bg-[#C55454] rounded-lg ">
            
            <div className='flex justify-top gap-4 mb-4'>
                <button className=' rounded px-4 py-1 cursor-pointer'  onClick={() => changeMode("pomodoro")}>Pomodoro</button>
                <button className=' rounded px-4 py-1 cursor-pointer'  onClick={() => changeMode("short")}>Short Break</button>
                <button className=' rounded px-4 py-1 cursor-pointer'  onClick={() => changeMode("long")}>Long Break</button>
            </div>

            <p className="text-center text-5xl text-white">{txtMinutos}</p>
            
            <div className='mt-4 text-center'>

              <button 
              className='bg-white rounded p-1 px-3 mr-2 cursor-pointer min-w-[96px]' 
              onClick={ isRunning ? handleNotRunning : handleRunning}
              >{isRunning ? "Pause" : "Start" }</button>
                
    
                {/* <button 
                    className='bg-white rounded p-1 px-3 mr-2 cursor-pointer'
                    onClick={handleReset}>
                    Resetear
                </button> */}

                
            </div>
          
        </div>
    </div>
  )
}
