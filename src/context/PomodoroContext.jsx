import { createContext, useState } from "react";

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  const [mode, setMode] = useState("pomodoro");

  const changeMode = (newMode) => setMode(newMode);

  return (
    <PomodoroContext.Provider value={{ mode, changeMode }}>
      {children}
    </PomodoroContext.Provider>
  );
};