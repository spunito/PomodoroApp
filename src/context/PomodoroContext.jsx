import { createContext, useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import check from '../../public/sounds/check.mp3';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  
  const [mode, setMode] = useState("pomodoro");
  const [showSetting , setShowSetting] = useState(false);
  const [showHowTo , setShowHowTo] = useState(false);

 
  const [pomodoroTime , setPomodoroTime] = useState(1);
  const [shortBreakTime , setShortBreakTime] = useState(1);
  const [longBreakTime , setLongBreakTime] = useState(1);

 const [pomodoroCount, setPomodoroCount] = useState(0)
  const [timer, setTimer] = useState(pomodoroTime);

  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [playSound] = useSound(check);

  useEffect(() => {
    if (!isRunning) {
      if (mode === "pomodoro") setTimer(pomodoroTime );
      else if (mode === "short") setTimer(shortBreakTime );
      else if (mode === "long") setTimer(longBreakTime );
    }
  }, [pomodoroTime, shortBreakTime, longBreakTime, mode, isRunning]);

 
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Cuando timer llega a 0: reproducir sonido y cambiar modo a short break
  // useEffect(() => {
  //   if (timer === 0) {
  //     playSound();
  //     clearInterval(timerRef.current);
  //     setIsRunning(false);
  //     changeMode("short");
  //     setIsRunning(true);
  //   }
  // }, [timer]);

useEffect(() => {
  const nextCount = pomodoroCount + 1;

  // Caso: termina un Pomodoro
  if (timer === 0 && mode === "pomodoro") {
    setPomodoroCount(nextCount);

    if (nextCount < 4) {
      changeMode("short");
      playSound();
    } else if (nextCount === 4) {
      changeMode("long");
      playSound();
      setPomodoroCount(0);
    }

    setIsRunning(true);
  }

  // Caso: termina un descanso corto o largo
  if (timer === 0 && (mode === "short" || mode === "long")) {
    changeMode("pomodoro");
    playSound(); 
    setIsRunning(true);
  }
}, [timer, mode]);
console.log(pomodoroCount)
 
  useEffect(() => {
    const minutos = Math.floor(timer / 60);
    const segundos = timer % 60;
    const txtMinutos = minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');

    if (mode === "pomodoro") {
      document.title = txtMinutos + " - Hora de enfocarse";
    } else if (mode === "short" || mode === "long") {
      document.title = txtMinutos + " - Hora de descansar";
    }
  }, [timer, mode]);


  const changeMode = (newMode) => {
    setMode(newMode);
    if (newMode === "pomodoro") setTimer(pomodoroTime );
    else if (newMode === "short") setTimer(shortBreakTime );
    else if (newMode === "long") setTimer(longBreakTime );
    setIsRunning(false);
  };


  const handleRunning = () => setIsRunning(true);
  const handleNotRunning = () => setIsRunning(false);

  return (
    <PomodoroContext.Provider value={{
      mode,
      setMode,
      showSetting,
      setShowSetting,
      showHowTo,
      setShowHowTo,
      pomodoroTime,
      setPomodoroTime,
      shortBreakTime,
      setShortBreakTime,
      longBreakTime,
      setLongBreakTime,
      timer,
      isRunning,
      changeMode,
      handleRunning,
      handleNotRunning,
      pomodoroCount
    }}>
      {children}
    </PomodoroContext.Provider>
  );
};
