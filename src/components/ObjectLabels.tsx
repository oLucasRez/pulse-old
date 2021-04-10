//---------------------------------------------------------------< components >
import { Label } from "./Label";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { Dices as DicesCRUD } from "../cruds/Dices.crud";
import { Players as PlayersCRUD } from "../cruds/Players.crud";
//=========================================================[ < ObjectLabels > ]
export function ObjectLabels() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersCRUD);
  const { getDice } = useContext(DicesCRUD);
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