import { createContext, useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import check from '../assets/sounds/check.mp3';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  
  const [mode, setMode] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { mode } = JSON.parse(saved);
    return mode || "pomodoro";
  }
  return "pomodoro";
});

const [showSetting, setShowSetting] = useState(false);
const [showHowTo, setShowHowTo] = useState(false);

const [pomodoroTime, setPomodoroTime] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { pomodoroTime } = JSON.parse(saved);
    return pomodoroTime || 25;
  }
  return 25;
});


const [shortBreakTime, setShortBreakTime] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { shortBreakTime } = JSON.parse(saved);
    return shortBreakTime || 5;
  }
  return 5;
});

const [longBreakTime, setLongBreakTime] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { longBreakTime } = JSON.parse(saved);
    return longBreakTime || 15;
  }
  return 15;
});

const [pomodoroCount, setPomodoroCount] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { pomodoroCount } = JSON.parse(saved);
    return pomodoroCount || 0;
  }
  return 0;
});

// Para el timer, es importante usar pomodoroTime inicial para calcular el estado inicial:
const [timer, setTimer] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { timer } = JSON.parse(saved);
    return timer || 25 * 60;
  }
  return 25 * 60;
});

const [isRunning, setIsRunning] = useState(() => {
  const saved = localStorage.getItem('pomodoroState');
  if (saved) {
    const { isRunning } = JSON.parse(saved);
    return isRunning || false;
  }
  return false;
});

const timerRef = useRef(null);
const [playSound] = useSound(check);

  useEffect(() => {
    if (!isRunning) {
      if (mode === "pomodoro") setTimer(pomodoroTime * 60);
      else if (mode === "short") setTimer(shortBreakTime * 60);
      else if (mode === "long") setTimer(longBreakTime * 60);
    }
  }, [ mode, isRunning ,showSetting ]);

 
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
    playSound();
    setIsRunning(true);
  }
  if (timer === 0 && (mode === "short" || mode === "long")) {
    changeMode("pomodoro");
    setIsRunning(true);
  }
    }, [timer, mode]);

 
  useEffect(() => {
    const minutos = Math.floor(timer / 60);
    const segundos = timer % 60;
    const txtMinutos = minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');

    if (mode === "pomodoro") {
      document.title = txtMinutos + " - Time to Focus";
    } else if (mode === "short" || mode === "long") {
      document.title = txtMinutos + " - Time to take a break";
    }
  }, [timer, mode]);


useEffect(() => {
  const stateToSave = {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    timer,
    mode,
    pomodoroCount,
    isRunning
  };
  localStorage.setItem('pomodoroState', JSON.stringify(stateToSave));
}, [pomodoroTime, shortBreakTime, longBreakTime, timer, mode, pomodoroCount, isRunning]);
 
  
  const changeMode = (newMode) => {
    setMode(newMode);
    if (newMode === "pomodoro") setTimer(pomodoroTime * 60);
    else if (newMode === "short") setTimer(shortBreakTime * 60);
    else if (newMode === "long") setTimer(longBreakTime * 60);
    setIsRunning(false);
  };
  const restartPomodoro = () => {

    setMode("pomodoro")
    setPomodoroTime(25)
    setShortBreakTime(5)
    setLongBreakTime(15)
    setShowSetting(false)
  }

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
      pomodoroCount,
      restartPomodoro
    }}>
      {children}
    </PomodoroContext.Provider>
  );
};
