//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
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
    },
    {
      object: "Olho Mágico",
      color: "blue",
    },
    {
      object: "Zarabatana",
      color: "green",
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
