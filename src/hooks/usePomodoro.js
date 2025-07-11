import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import check from '../../public/sounds/check.mp3'
import { PomodoroContext } from "../context/PomodoroContext";



export const usePomodoro = () => {

    const {mode , setMode } = useContext(PomodoroContext);
    const [playSound] = useSound(check)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(null);
    // Tiempos
    
    const [pomodoroTime = 25, setPomodoroTime] = useState();
    const [shortBreakTime = 5, setShortBreakTime] = useState();
    const [longBreakTime = 15, setLongBreakTime] = useState();
    
    const [timer, setTimer] = useState(()=> {
    return (mode === "pomodoro") ? pomodoroTime * 60 
    : (mode === "short") ? shortBreakTime *60 
    : (mode === "long") ? longBreakTime * 60
    : 0
    })

    const changeMode = (newMode)=> {
      
      setMode(newMode)
      if(newMode === "pomodoro"){
        setTimer(pomodoroTime * 60)
      }
      if(newMode === "short"){
        setTimer(shortBreakTime * 60)
      }
      if(newMode === "long"){
        setTimer(longBreakTime * 60)
      }
      setIsRunning(false);

    }

    // const handleReset = () => {
    //     setTimer(1500)
    //     setIsRunning(false);
    // }

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
      if (!isRunning) {
        if (mode === "pomodoro") {
          setTimer(pomodoroTime * 60);
        } else if (mode === "short") {
          setTimer(shortBreakTime * 60);
        } else if (mode === "long") {
          setTimer(longBreakTime * 60);
        }
      }   
  }, [pomodoroTime, shortBreakTime, longBreakTime, mode, isRunning]);

    
    

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
        changeMode("short")
        setIsRunning(true)
      }
      
    }, [timer])
  

    return {
        timer,
        isRunning,
        // handleReset,
        handleRunning,
        handleNotRunning,
        changeMode,
        mode,
        pomodoroTime,
        setPomodoroTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime
        
        
        


  }
}
