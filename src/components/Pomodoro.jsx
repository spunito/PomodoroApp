import React from 'react'
import { usePomodoro } from '../hooks/usePomodoro'

export const Pomodoro = () => {

    const {timer, isRunning , handleReset ,mode, handleRunning, handleNotRunning , changeMode} = usePomodoro()
    const minutos = Math.floor(timer/60)
    const segundos = timer % 60
    const txtMinutos = minutos.toString().padStart(2, '0')+ ":" + segundos.toString().padStart(2, '0')
    console.log(mode)
    return (

    <div className={`${mode ==="pomodoro" ? 'bg-[rgb(186,73,73)]' : mode === "short"  ? "bg-[#38858a]"  : mode === "long"  ? "bg-[#397097]" :'' }
     "w-full h-screen flex flex-col items-center justify-center font-mono`}>
        
          <div className={`${mode ==="pomodoro" ? 'bg-[#C55454]' : mode === "short"  ? "bg-[#4B9A9C]"  : mode === "long"  ? "bg-[#4B7A9C]" :'' } p-15  rounded-lg `}>
            
            <div className='flex justify-top gap-4 mb-4 text-white' >
                <button className={`rounded px-4 py-1 cursor-pointer ${mode === "pomodoro" ? 'bg-[#A34444] ' : ''}`}  onClick={() => changeMode("pomodoro")}>Pomodoro</button>
                <button className={`rounded px-4 py-1 cursor-pointer ${mode === "short" ? 'bg-[#3A7D7E]' : ''}`}  onClick={() => changeMode("short")}>Short Break</button>
                <button className={`rounded px-4 py-1 cursor-pointer ${mode === "long" ? 'bg-[#3B627E]' : ''}`}  onClick={() => changeMode("long")}>Long Break</button>
            </div>

            <p className="text-center text-9xl text-white pb-6">{txtMinutos}</p>
            
            <div className='mt-4 text-center text-6xl '>

              <button
              className={` ${mode ==="pomodoro" ? 'text-[rgb(186,73,73)]' : mode === "short"  ? "text-[#38858a]"  : mode === "long"  ? "text-[#397097]" :'' } bg-white rounded p-1 rounded-lg px-3 mr-2 cursor-pointer min-w-[96px]`}
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
