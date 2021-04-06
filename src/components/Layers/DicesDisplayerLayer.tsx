//---------------------------------------------------------------< components >
import { Layer } from ".";
import { Dice } from "../Dice";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { PlayersContext } from "../../contexts/PlayersContext";
import { DicesContext } from "../../contexts/DicesContext";
//--------------------------------------------------------------------< types >
import { LayerProps } from ".";
//==================================================[ < DicesDisplayerLayer > ]
export function DicesDisplayerLayer({ children, ...props }: LayerProps) {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersContext);
  const { getDice } = useContext(DicesContext);
  //-----------------------------------------------------------------< return >
  console.log("dices-displayer-layer render");
  return (
    <Layer {...props}>
      {players.map((player, index) => {
        const dice = getDice(player.color);
        return dice.origin && <Dice key={index} {...dice} />;
      })}

      {children}
    </Layer>
  );
}
