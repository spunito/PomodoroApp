import { createContext, useState } from "react";

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  
  const [mode, setMode] = useState("pomodoro");
  const [ShowSetting , setShowSetting] = useState (false);

  return (
    <PomodoroContext.Provider value={{ 
      mode , 
      setMode,
      ShowSetting,
      setShowSetting }}>
      {children}
    </PomodoroContext.Provider>
  );
};