//------------------------------------------------------------------< helpers >
import { mod, sub, sum, mult } from "../helpers/vectorHelper";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IVector } from "../types/IVector";
import { IPulse } from "../types/IPulse";
import { ReactNode } from "react";
interface IData {
  crossings: IVector[];
  addNewCrossings: (pulse: IPulse, pulses: IPulse[]) => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const CrossingsContext = createContext({} as IData);
//====================================================[ < CrossingsProvider > ]
export function CrossingsProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [crossings, setCrossings] = useState<IVector[]>([]);
  //----------------------------------------------------------------< methods >
  function addNewCrossings(pulse: IPulse, pulses: IPulse[]) {
    const _crossings: IVector[] = [];

    for (let j = 0; j < pulses.length; j++) {
      if (pulse === pulses[j]) continue;

      const current = pulse;
      const target = pulses[j];

      const distBetween = mod(sub(current.origin, target.origin));

      for (let k = 1; k <= current.amount; k++) {
        for (let l = 1; l <= target.amount; l++) {
          if (distBetween < current.gap * k + target.gap * l) {
            const [crossing1, crossing2] = calcCrossings(
              current.origin,
              current.gap * k,
              target.origin,
              target.gap * l
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
  //---------------------------------------------------------------------------
  function calcCrossings(
    c1: IVector,
    r1: number,
    c2: IVector,
    r2: number
  ): IVector[] {
    const d = mod(sub(c1, c2));
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(r1 * r1 - a * a);
    const p3 = sum(c1, mult(sub(c2, c1), a / d));

    const crossing1 = {
      x: p3.x + ((c2.y - c1.y) * h) / d,
      y: p3.y - ((c2.x - c1.x) * h) / d,
    };
    const crossing2 = {
      x: p3.x - ((c2.y - c1.y) * h) / d,
      y: p3.y + ((c2.x - c1.x) * h) / d,
    };

    return [crossing1, crossing2];
  }

  function includes(crossing: IVector, crossings: IVector[]) {
    return !crossings.filter(
      (_crossing) =>
        Math.floor(crossing.x) === Math.floor(_crossing.x) &&
        Math.floor(crossing.y) === Math.floor(_crossing.y)
    ).length;
  }
  //-----------------------------------------------------------------< return >
  console.log("crossings-provider rendered");
  return (
    <CrossingsContext.Provider value={{ crossings, addNewCrossings }}>
      {children}
    </CrossingsContext.Provider>
  );
}
