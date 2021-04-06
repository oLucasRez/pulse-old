//------------------------------------------------------------------< helpers >
import { mod, sub } from "../helpers/Vector.helper";
import { calcCrossings, includes } from "../helpers/CrossingsContext.helper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Pulse } from "../types/Pulse.type";
import { ReactNode } from "react";

interface Data {
  crossings: Vector[];
  addNewCrossings: (pulse: Pulse, pulses: Pulse[]) => void;
}

interface Props {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const CrossingsContext = createContext({} as Data);
//====================================================[ < CrossingsProvider > ]
export function CrossingsProvider({ children }: Props) {
  //-------------------------------------------------------------< properties >
  const [crossings, setCrossings] = useState<Vector[]>([]);
  //----------------------------------------------------------------< methods >
  function addNewCrossings(pulse: Pulse, pulses: Pulse[]) {
    const _crossings: Vector[] = [];

    for (let i = 0; i < pulses.length; i++) {
      if (pulse === pulses[i]) continue;

      const current = pulse;
      const target = pulses[i];

      const distBetween = mod(sub(current.origin, target.origin));

      for (let j = 1; j <= current.amount; j++) {
        for (let k = 1; k <= target.amount; k++) {
          if (distBetween < current.gap * j + target.gap * k) {
            const [crossing1, crossing2] = calcCrossings(
              current.origin,
              current.gap * k,
              target.origin,
              target.gap * k
            );

            if (!isNaN(crossing1.x)) {
              if (includes(crossing1, _crossings)) _crossings.push(crossing1);
              if (includes(crossing2, _crossings)) _crossings.push(crossing2);
            }
          }
        }
      }
    }

    setCrossings([...crossings, ..._crossings]);
  }
  //-----------------------------------------------------------------< return >
  console.log("crossings-provider rendered");
  return (
    <CrossingsContext.Provider value={{ crossings, addNewCrossings }}>
      {children}
    </CrossingsContext.Provider>
  );
}
