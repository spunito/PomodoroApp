import { useEffect, useRef, useState } from "react";

const durations ={
  pomodoro:1500,
  short:300,
  long:900
}


export const usePomodoro = () => {

    const [mode, setMode] = useState("pomodoro")
    const [timer, setTimer] = useState(durations[mode])
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
        changeMode


  }
}
