//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IPulse } from "../types/IPulse";
import { ReactNode } from "react";
interface PulsesContextData {
  pulses: IPulse[];
  addPulse: (pulse: IPulse) => void;
}
interface PulsesProviderProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PulsesContext = createContext({} as PulsesContextData);
//=======================================================[ < PulsesProvider > ]
export function PulsesProvider({ children }: PulsesProviderProps) {
  //-------------------------------------------------------------< properties >
  const [pulses, setPulses] = useState<IPulse[]>([]);
  //----------------------------------------------------------------< methods >
  function addPulse(pulse: IPulse) {
    setPulses([...pulses, pulse]);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulses-provider rendered");
  return (
    <PulsesContext.Provider value={{ pulses, addPulse }}>
      {children}
    </PulsesContext.Provider>
  );
}
