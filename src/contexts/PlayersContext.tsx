//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { Player } from "../types/Player.type";
import { Color } from "../types/Color.type";
import { ReactNode } from "react";

export interface PlayersContextData {
  players: Player[];
  updatePlayer: (color: Color, whatToUpdate: any) => void;
}

interface Props {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const PlayersContext = createContext({} as PlayersContextData);
//======================================================[ < PlayersProvider > ]
export function PlayersProvider({ children }: Props) {
  //-------------------------------------------------------------< properties >
  const [players, setPlayers] = useState<Player[]>([
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
  function updatePlayer(color: Color, whatToUpdate: any) {
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
