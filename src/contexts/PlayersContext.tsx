//-----------------------------------------------------------------< contexts >
import { createContext, useState } from "react";
//--------------------------------------------------------------------< types >
import { IPlayer } from "../types/IPlayer";
import { ReactNode } from "react";
interface IData {
  players: IPlayer[];
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PlayersContext = createContext({} as IData);
//======================================================[ < PlayersProvider > ]
export function PlayersProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [players] = useState<IPlayer[]>([
    {
      object: "Caneta Pena",
      color: "orange",
      dice: 4,
    },
    {
      object: "Olho Mágico",
      color: "blue",
      dice: 6,
    },
    {
      object: "Zarabatana",
      color: "green",
      dice: 8,
    },
  ]);
  //-----------------------------------------------------------------< return >
  console.log("players-provider rendered");
  return (
    <PlayersContext.Provider value={{ players }}>
      {children}
    </PlayersContext.Provider>
  );
}
