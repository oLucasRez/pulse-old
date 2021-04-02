//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Dice } from "../Dice";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { PlayersContext } from "../../contexts/PlayersContext";
import { DicesContext } from "../../contexts/DicesContext";
//==================================================[ < DicesDisplayerLayer > ]
export function DicesDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  const { getDice } = useContext(DicesContext);
  //-----------------------------------------------------------------< return >
  console.log("players-displayer-layer render");
  return (
    <Layer>
      {players.map((player, index) => {
        const dice = getDice(player.color);
        return <g key={index}>{dice.origin && <Dice dice={dice} />}</g>;
      })}
    </Layer>
  );
}
