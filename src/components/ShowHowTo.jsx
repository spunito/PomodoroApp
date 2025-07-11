import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'

export const ShowHowTo = () => {
  const { showHowTo, setShowHowTo } = useContext(PomodoroContext)

  return (
    <div>
      {showHowTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Fondo oscuro que bloquea clics al Pomodoro */}
          <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto"></div>

          {/* Caja del modal con las explicaciones */}
          <div className="relative z-10 bg-white rounded-lg p-6 shadow-xl max-w-md w-full">

            <h1 className="pb-3 border-b-2 text-center text-xl font-semibold">
              What is the Pomodoro Technique?
            </h1>

            <div className="pt-4 pb-4 space-y-4 text-left mx-auto max-w-md">
              <p>
                The Pomodoro Technique is a time management method that breaks work into 25-minute focused sessions called pomodoros, followed by 5-minute short breaks. After completing 4 pomodoros, a longer break of 15 to 30 minutes is taken.
              </p>
              <p>
                This approach helps improve focus, reduce mental fatigue, and boost productivity.
              </p>
            </div>

            <div className="flex justify-center">
              <button 
                className="bg-red-700 p-2 rounded-lg text-white hover:bg-red-800 transition"
                onClick={() => setShowHowTo(false)}
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}
