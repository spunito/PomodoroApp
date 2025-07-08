import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import check from '../../public/sounds/check.mp3'
import { PomodoroContext } from "../context/PomodoroContext";
const durations ={
  pomodoro:1500,
  short:300,
  long:900
}



export const usePomodoro = () => {

    const {mode , setMode} = useContext(PomodoroContext);
    const [timer, setTimer] = useState(durations[mode])
    const [playSound] = useSound(check)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(null);


    const changeMode = (newMode)=> {
      setMode(newMode)
      setTimer(durations[newMode])
      setIsRunning(false);

    }
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
      const minutos = Math.floor(timer/60)
      const segundos = timer % 60
      const txtMinutos = minutos.toString().padStart(2, '0')+ ":" + segundos.toString().padStart(2, '0')

      if (mode === "pomodoro") {
        document.title = txtMinutos + " - Hora de enfocarse";
      } else if (mode === "short" || mode === "long") {
        document.title = txtMinutos + " - Hora de descansar";
      }
       
      
    }, [timer]);

    useEffect(() => {
        if(isRunning){
            timerRef.current = setInterval(() => {
            setTimer(prev => {
              if(prev <= 1){
                clearInterval(timerRef.current);
                setIsRunning(false)
                return 0;
              }
              return prev - 1;
            } )
        }, 1000);
        }
      return () => {
        clearInterval(timerRef.current);
      }
    }, [isRunning])
    
    useEffect(() => {
      if(timer === 0) {
        playSound()
        clearInterval(timerRef.current);
        setIsRunning(false)
      }
      
    }, [timer])
  

    return {
        timer,
        isRunning,
        handleReset,
        handleRunning,
        handleNotRunning,
        changeMode,
        mode


  }
}
