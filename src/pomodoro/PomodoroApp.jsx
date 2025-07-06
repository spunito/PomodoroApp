import React, { useEffect, useRef, useState } from 'react'

export const PomodoroApp = () => {
  
    
    const [timer, setTimer] = useState(1500)
    const [isRunning, setIsRunning] = useState(true)

    const timerRef = useRef(null);
    const minutos = Math.floor(timer/60)
    const segundos = timer % 60
    const txtMinutos = minutos.toString().padStart(2, '0')+ ":" + segundos.toString().padStart(2, '0')
    const handleReset = () => {
        setTimer(1500)
        setIsRunning(false);
    }

    const handleRunning = () => {
        setIsRunning(true)
    }
    const handleNotRunning = () => {
        setIsRunning(false)
    }
    
    useEffect(() => {
        if(isRunning){
            timerRef.current = setInterval(() => {
            setTimer(prev => prev - 1 )
        }, 1000);
        }
      return () => {
        clearInterval(timerRef.current);
      }
    }, [isRunning])
    
    useEffect(() => {
      if(timer === 0) {
        clearInterval(timerRef.current);
        setIsRunning(false)
      }
      
    }, [timer])
    
    return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-800'>
        <p>{txtMinutos}</p>
        
        <div className='mt-4'>
            <button 
            id='btnReanude'
            className='bg-red-800 rounded p-1 px-3 mr-2 cursor-pointer'
            onClick={handleRunning}>
                Reanudar
            </button>

            <button 
                className='bg-red-800 rounded p-1 px-3 mr-2 cursor-pointer'
                onClick={handleReset}>
                Resetear
            </button>

            <button 
                className='bg-red-500 rounded p-1 px-3 cursor-pointer'
                onClick={handleNotRunning}>
                Pausar
            </button>
        </div>
        
    </div>
    
  )
}
