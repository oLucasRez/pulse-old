//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { IPlayer } from "../types/IPlayer";
import { ReactNode } from "react";
import { IColor } from "../types/IColor";
export interface IPlayersContext {
  players: IPlayer[];
  updatePlayer: (color: IColor, whatToUpdate: any) => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PlayersContext = createContext({} as IPlayersContext);
//======================================================[ < PlayersProvider > ]
export function PlayersProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [players, setPlayers] = useState<IPlayer[]>([
    {
      object: "",
      color: "orange",
    },
    {
      object: "",
      color: "blue",
    },
    {
      object: "",
      color: "green",
    },
  ]);
  //----------------------------------------------------------------< methods >
  function updatePlayer(color: IColor, whatToUpdate: any) {
    const _players = players.map((player) => {
      if (player.color === color)
        return {
          object: whatToUpdate.object ?? player.object,
          color: whatToUpdate.color ?? player.color,
        };
      else return player;
    });

    setPlayers(_players);
  }
  //-----------------------------------------------------------------< return >
  console.log("players-provider rendered");
  return (
    <PlayersContext.Provider value={{ players, updatePlayer }}>
      {children}
    </PlayersContext.Provider>
  );
}
