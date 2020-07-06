import React, {createContext} from 'react';
import useClock from "../customHooks/useClock";

export const ClockContext = createContext();

export function ClockProvider ({ children }) {
  const { seconds, minutes, hours, secondsAngle, minutesAngle } = useClock();

  return <ClockContext.Provider value={{ seconds, minutes, hours, secondsAngle, minutesAngle }}>{children}</ClockContext.Provider>
}