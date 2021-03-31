//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
import { CrossingsContext } from "./CrossingsContext";
//--------------------------------------------------------------------< types >
import { IPulse } from "../types/IPulse";
import { IColor } from "../types/IColor";
import { ReactNode } from "react";
import { IVector } from "../types/IVector";
interface IData {
  pulses: IPulse[];
  addPulse: (pulse: IPulse) => void;
  updatePulse: (color: IColor, whatToUpdate: WhatToUpdate) => void;
  getPulse: (color: IColor) => IPulse | undefined;
}
interface IProps {
  children: ReactNode;
}
interface WhatToUpdate {
  origin?: IVector;
  amount?: number;
  gap?: number;
  color?: IColor;
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
      amount: 0,
      gap: 36,
      color: "foreground",
    },
  ]);
  //----------------------------------------------------------------< methods >
  function addPulse(pulse: IPulse) {
    console.log([...pulses, pulse]);
    setPulses([...pulses, pulse]);
    addNewCrossings(pulse, [...pulses, pulse]);
  }

  function updatePulse(color: IColor, whatToUpdate: WhatToUpdate) {
    const _pulses = pulses.map((pulse) => {
      if (pulse.color === color) {
        return {
          origin: whatToUpdate.origin ?? pulse.origin,
          amount: whatToUpdate.amount ?? pulse.amount,
          gap: whatToUpdate.gap ?? pulse.gap,
          color: whatToUpdate.color ?? pulse.color,
        };
      } else return pulse;
    });

    setPulses(_pulses);
  }

  function getPulse(color: IColor) {
    return pulses.find((pulse) => pulse.color === color);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulses-provider rendered");
  return (
    <PulsesContext.Provider value={{ pulses, addPulse, updatePulse, getPulse }}>
      {children}
    </PulsesContext.Provider>
  );
}
