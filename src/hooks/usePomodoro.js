import { useContext } from "react";
import { PomodoroContext } from "../context/PomodoroContext";

export const usePomodoro = () => {
  return useContext(PomodoroContext);
};
