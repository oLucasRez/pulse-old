//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
import { CrossingsContext } from "../contexts/CrossingsContext";
//--------------------------------------------------------------------< types >
import { Pulse } from "../types/Pulse.type";
import { Color } from "../types/Color.type";
import { ReactNode } from "react";

export interface PulsesContextData {
  pulses: Pulse[];
  addPulse: (pulse: Pulse) => void;
  updatePulse: (color: Color, whatToUpdate: any) => void;
  getPulse: (color: Color) => Pulse;
}

interface Props {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const Pulses = createContext({} as PulsesContextData);
//=======================================================[ < PulsesProvider > ]
export function PulsesProvider({ children }: Props) {
  //-------------------------------------------------------------< properties >
  const { addNewCrossings } = useContext(CrossingsContext);
  //---------------------------------------------------------------------------
  const [pulses, setPulses] = useState<Pulse[]>([
    {
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      amount: 0,
      gap: 36,
      color: "foreground",
    },
  ]);
  //----------------------------------------------------------------< methods >
  function addPulse(pulse: Pulse) {
    if (getPulse(pulse.color) === ({} as Pulse)) return;

    const _pulses = [...pulses];
    _pulses.push(pulse);

    setPulses(_pulses);
    addNewCrossings(pulse, _pulses);
  }

  function updatePulse(color: Color, whatToUpdate: any) {
    const _pulses = pulses.map((pulse) => {
      if (pulse.color === color) {
        const newPulse = {
          origin: whatToUpdate.origin ?? pulse.origin,
          amount: whatToUpdate.amount ?? pulse.amount,
          gap: whatToUpdate.gap ?? pulse.gap,
          color: whatToUpdate.color ?? pulse.color,
        };
        addNewCrossings(newPulse, pulses);
        return newPulse;
      } else return pulse;
    });

    setPulses(_pulses);
  }

  function getPulse(color: Color) {
    return pulses.find((pulse) => pulse.color === color) ?? ({} as Pulse);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulses-provider rendered");
  return (
    <Pulses.Provider value={{ pulses, addPulse, updatePulse, getPulse }}>
      {children}
    </Pulses.Provider>
  );
}
