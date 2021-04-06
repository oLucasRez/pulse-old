//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { Dice } from "../types/Dice.type";
import { Color } from "../types/Color.type";
import { ReactNode } from "react";

export interface DicesContextData {
  dices: Dice[];
  getDice: (color: Color) => Dice;
  addDice: (dice: Dice) => void;
  updateDice: (color: Color, whatToUpdate: any) => void;
}

interface Props {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const DicesContext = createContext({} as DicesContextData);
//========================================================[ < DicesProvider > ]
export function DicesProvider({ children }: Props) {
  //-------------------------------------------------------------< properties >
  const [dices, setDices] = useState<Dice[]>([
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
  function getDice(color: Color) {
    return dices.find((dice) => dice.color === color) ?? ({} as Dice);
  }

  function addDice(dice: Dice) {
    setDices([...dices, dice]);
  }

  function updateDice(color: Color, { origin, value }: any) {
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
    <DicesContext.Provider value={{ dices, getDice, addDice, updateDice }}>
      {children}
    </DicesContext.Provider>
  );
}
