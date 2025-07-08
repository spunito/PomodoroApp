import { useContext, useState } from 'react';
import check from '../../../public/vite.svg'
import { usePomodoro } from '../../hooks/usePomodoro';
import { PomodoroContext } from '../../context/PomodoroContext';


export const Navbar = () => {
 
  const {mode} = useContext(PomodoroContext)

  return (
    <nav className=" fixed w-full p-4 z-font-medium text-black text z-99  ">
      <div className="container mx-auto border-b-1 pb-2 border-gray-500 ">
        <div className="flex items-center justify-between  ">
          {/* Logo */}
          <a href="/" className="flex items-center pl-5 ">
            <svg 
            className="h-10 w-10 object-contain rounded-full transition-transform duration-300 bg-white "
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48">
              <path fill={`${mode ==="pomodoro" ? '#BA4949' : mode === "short"  ? "#38858a"  : mode === "long"  ? "#397097" :'' }`} d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
              <path fill="#FFFFFF" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
            </svg>
            <p className='pl-4 text-white text-xl'>Pomodoro App</p>
          </a>

          {/* Desktop Menu */}
          

          {/* Mobile Menu Icon */}
          
        </div>
        
      </div>

      
    </nav>
  );
};