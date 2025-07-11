import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'

export const ShowHowTo = () => {

    const {  showHowTo , setShowHowTo  } = useContext(PomodoroContext)

    return (
    <div>
        {
              (showHowTo === true) ? 
              
                <div 
                className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 shadow-xl">
                  <h1 className='pb-3 border-b-2'>Configuraciones</h1>
                <div className='flex-row md:col-3 pt-4 pb-4'>
                  
                  

                  <button 
                  className='cursor-pointer bg-red-700 p-1 rounded-lg text-center'
                  onClick={() => setShowHowTo(false)}>Salir</button>
                </div> 
              </div>
                : ' '
                
        }
    </div>
    
  )
}

