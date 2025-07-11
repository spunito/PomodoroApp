import { createContext, useState } from "react";

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  
  const [mode, setMode] = useState("pomodoro");
  const [showSetting , setShowSetting] = useState (false);
  const [showHowTo , setShowHowTo] = useState (false);
  return (
    <PomodoroContext.Provider value={{ 
      mode , 
      setMode,
      showSetting,
      setShowSetting,
      showHowTo,
      setShowHowTo }}>
      {children}
    </PomodoroContext.Provider>
  );
};