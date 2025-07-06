import React from 'react'

export const PomodoroApp = () => {
  
    const now = new Date() 
    now.setMinutes(now.getMinutes() + 25) 
    console.log(now) 
    
    

    return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-100'>

        <a href="">25 Minutos</a>
        <button className=''></button>
        <p>{JSON.stringify(now , 3) }</p>
    </div>
  )
}
