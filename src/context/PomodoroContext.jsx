import { createContext, useState } from "react";

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  
  const [mode, setMode] = useState("pomodoro");

  return (
    <PomodoroContext.Provider value={{ mode , setMode }}>
      {children}
    </PomodoroContext.Provider>
  );
};