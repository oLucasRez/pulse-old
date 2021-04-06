//---------------------------------------------------------------< components >
import { Label } from "./Label";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { DicesContext } from "../contexts/DicesContext";
import { PlayersContext } from "../contexts/PlayersContext";
//=========================================================[ < ObjectLabels > ]
export function ObjectLabels() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  const { getDice } = useContext(DicesContext);
  //-----------------------------------------------------------------< return >
  return (
    <>
      {players.map((player, index) => {
        const { origin, color } = getDice(player.color);

        return (
          <g key={index}>
            {origin && (
              <Label
                origin={origin}
                size={24}
                font="cursive light"
                fill={color}
              >
                {player.object}
              </Label>
            )}
          </g>
        );
      })}
    </>
  );
}
