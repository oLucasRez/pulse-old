//---------------------------------------------------------------< components >
import { Dice } from "../views/Dice.view";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { Players as PlayersCRUD } from "../cruds/Players.crud";
import { Dices as DicesCRUD } from "../cruds/Dices.crud";
//--------------------------------------------------------------------< types >
//================================================================[ < Dices > ]
export function Dices() {
  //-------------------------------------------------------------< properties >
  const { players } = useContext(PlayersCRUD);
  const { getDice } = useContext(DicesCRUD);
  //-----------------------------------------------------------------< return >
  console.log("displayer-layer render");
  return (
    <>
      {players.map((player, index) => {
        const dice = getDice(player.color);
        return dice.origin && <Dice key={index} {...dice} />;
      })}
    </>
  );
}
