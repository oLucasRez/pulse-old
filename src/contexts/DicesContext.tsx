//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IDispatcher } from "../types/IDispatcher";
import { ReactNode } from "react";
import { IDice } from "../types/IDice";
import { IPlayer } from "../types/IPlayer";
import { IVector } from "../types/IVector";
import { IColor } from "../types/IColor";
interface IData {
  // currentDice?: IDice;
  dices: IDice[];
  // setCurrentDice: IDispatcher<IDice | undefined>;
  rolled: number;
  addDice: (dice: IDice) => void;
  getDiceByPlayer: (player: IPlayer) => IDice | undefined;
  updateDice: (color: IColor, whatToUpdate: WhatToUpdate) => void;
  onRolled: () => void;
}
interface IProps {
  children: ReactNode;
}
interface WhatToUpdate {
  origin?: IVector;
  value?: number;
}
//-------------------------------------------------------------------< global >
export const DicesContext = createContext({} as IData);
//========================================================[ < DicesProvider > ]
export function DicesProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [rolled, setRolled] = useState(0);
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

  function getDiceByPlayer(player: IPlayer) {
    return dices.find((dice) => dice.color === player.color);
  }

  function updateDice(color: IColor, whatToUpdate: WhatToUpdate) {
    const _dices = dices.map((dice) => {
      if (dice.color === color) {
        return {
          ...dice,
          origin: whatToUpdate.origin ?? dice.origin,
          value: whatToUpdate.value ?? dice.value,
        };
      } else return dice;
    });

    setDices(_dices);
  }

  function onRolled() {
    setRolled(rolled + 1);
  }
  //-----------------------------------------------------------------< return >
  console.log("dices-provider rendered");
  return (
    <DicesContext.Provider
      value={{ dices, rolled, addDice, getDiceByPlayer, updateDice, onRolled }}
    >
      {children}
    </DicesContext.Provider>
  );
}
