//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IPulse } from "../types/IPulse";
import { ReactNode } from "react";
import { CrossingsContext } from "./CrossingsContext";
interface IData {
  pulses: IPulse[];
  addPulse: (pulse: IPulse) => void;
  // clearPulses: () => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PulsesContext = createContext({} as IData);
//=======================================================[ < PulsesProvider > ]
export function PulsesProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const { addNewCrossings } = useContext(CrossingsContext);
  //---------------------------------------------------------------------------
  const [pulses, setPulses] = useState<IPulse[]>([
    {
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      amount: 1,
      gap: 24,
      color: "foreground",
    },
  ]);
  //----------------------------------------------------------------< methods >
  function addPulse(pulse: IPulse) {
    console.log([...pulses, pulse]);
    setPulses([...pulses, pulse]);
    addNewCrossings(pulse, [...pulses, pulse]);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulses-provider rendered");
  return (
    <PulsesContext.Provider value={{ pulses, addPulse }}>
      {children}
    </PulsesContext.Provider>
  );
}
