import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'

export const ShowHowTo = () => {

    const {  showHowTo , setShowHowTo  } = useContext(PomodoroContext)

return (
<div>
    {
            showHowTo && 
            
            (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
        
                {/* Fondo oscuro que bloquea clics al Pomodoro */}
                <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto"></div>
                {/* Caja del modal con las configuraciones */}
                <div className="relative z-10 bg-white rounded-lg p-5 shadow-xl">
                    <h1 className='pb-3 border-b-2'>¿Que es Pomodoro?</h1>
                    <div className='pt-4 pb-4'>
                    
                    </div>
                    <button className='bg-red-700 p-1 rounded-lg text-white' onClick={() => setShowHowTo(false)}>Salir</button>
                </div>

            </div>
            )
    }
</div>
    
  )
}

