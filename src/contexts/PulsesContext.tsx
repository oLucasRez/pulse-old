//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IPulse } from "../types/IPulse";
import { ReactNode } from "react";
interface IData {
  pulses: IPulse[];
  addPulse: (pulse: IPulse) => void;
  clearPulses: () => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PulsesContext = createContext({} as IData);
//=======================================================[ < PulsesProvider > ]
export function PulsesProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [pulses, setPulses] = useState<IPulse[]>([]);
  //----------------------------------------------------------------< methods >
  function addPulse(pulse: IPulse) {
    setPulses([...pulses, pulse]);
  }

  function clearPulses() {
    setPulses([]);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulses-provider rendered");
  return (
    <PulsesContext.Provider value={{ pulses, addPulse, clearPulses }}>
      {children}
    </PulsesContext.Provider>
  );
}
