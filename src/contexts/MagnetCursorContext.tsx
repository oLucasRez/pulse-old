//------------------------------------------------------------------< helpers >
import { zero, max, mod, sub, mult, norm } from "../helpers/vectorHelper";
//-----------------------------------------------------------------< contexts >
import { createContext, useContext, useState } from "react";
//--------------------------------------------------------------------< types >
import { IVector } from "../types/IVector";
import { ReactNode } from "react";
import { PulsesContext } from "./PulsesContext";
import { CrossingsContext } from "./CrossingsContext";
interface IData {
  magnetCursor: IVector;
  track: (cursor: IVector) => IVector;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const MagnetCursorContext = createContext({} as IData);
const intensity = 20;
//=================================================[ < MagnetCursorProvider > ]
export function MagnetCursorProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const { pulses } = useContext(PulsesContext);
  const { crossings } = useContext(CrossingsContext);
  //---------------------------------------------------------------------------
  const [magnetCursor, setMagnetCursor] = useState<IVector>(zero);
  //----------------------------------------------------------------< methods >
  function track(cursor: IVector) {
    let nearest: IVector = max;
    let distCursorNearest: number = mod(sub(nearest, cursor));

    // try attach to crossings
    crossings.forEach((crossing) => {
      const distCursorCrossing = mod(sub(crossing, cursor));
      distCursorNearest = mod(sub(nearest, cursor));

      if (distCursorCrossing < distCursorNearest) nearest = crossing;
    });

    // try attach to last crossing (why do i need this?)
    const lastCrossing = crossings[crossings.length - 1];
    if (lastCrossing) {
      const distCursorCrossing = mod(sub(lastCrossing, cursor));
      distCursorNearest = mod(sub(nearest, cursor));

      if (distCursorCrossing < distCursorNearest) nearest = lastCrossing;
    }

    if (distCursorNearest > intensity) {
      // try attach to pulse
      pulses.forEach((pulse) => {
        const distCursorOrigin = sub(pulse.origin, cursor);

        for (let i = 0; i <= pulse.amount; i++) {
          distCursorNearest = mod(sub(nearest, cursor));
          const radius = mult(norm(distCursorOrigin), pulse.gap * i);
          const distCursorCircle = mod(sub(distCursorOrigin, radius));

          if (distCursorCircle < distCursorNearest)
            nearest = sub(pulse.origin, radius);
        }
      });
    }

    nearest = distCursorNearest > intensity ? cursor : nearest;
    setMagnetCursor(nearest);

    return nearest;
  }
  //-----------------------------------------------------------------< return >
  console.log("magnet-cursor-provider rendered");
  return (
    <MagnetCursorContext.Provider value={{ magnetCursor, track }}>
      {children}
    </MagnetCursorContext.Provider>
  );
}
