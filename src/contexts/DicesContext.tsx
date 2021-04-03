//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { ReactNode } from "react";
import { IDice } from "../types/IDice";
import { IColor } from "../types/IColor";
export interface IDicesContext {
  dices: IDice[];
  addDice: (dice: IDice) => void;
  getDice: (color: IColor) => IDice;
  updateDice: (color: IColor, whatToUpdate: any) => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const DicesContext = createContext({} as IDicesContext);
//========================================================[ < DicesProvider > ]
export function DicesProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [dices, setDices] = useState<IDice[]>([
    {
      color: "orange",
      value: 0,
      sides: 4,
    },
    {
      color: "blue",
      value: 0,
      sides: 6,
    },
    {
      color: "green",
      value: 0,
      sides: 8,
    },
  ]);
  //----------------------------------------------------------------< methods >
  function addDice(dice: IDice) {
    setDices([...dices, dice]);
  }

  function getDice(color: IColor) {
    return dices.find((dice) => dice.color === color) ?? ({} as IDice);
  }

  function updateDice(color: IColor, { origin, value }: any) {
    const _dices = dices.map((dice) => {
      if (dice.color === color)
        return {
          ...dice,
          origin: origin ?? dice.origin,
          value: value ?? dice.value,
        };
      else return dice;
    });

    setDices(_dices);
  }
  //-----------------------------------------------------------------< return >
  console.log("dices-provider rendered");
  return (
    <DicesContext.Provider value={{ dices, addDice, getDice, updateDice }}>
      {children}
    </DicesContext.Provider>
  );
}
