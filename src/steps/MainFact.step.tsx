//---------------------------------------------------------------< interfaces >
import { StepProps, StepContext, StepState } from "../interfaces/Step";
//------------------------------------------------------------------< classes >
import { PulseRoll } from "../states/MainFact.step/PulseRoll.state";
//---------------------------------------------------------------< components >
import { Displayer } from "../displayers";
import { Pulses } from "../displayers/Pulses.displayer";
import { Dices } from "../displayers/Dices.displayer";
//------------------------------------------------------------------< helpers >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { Dices as DicesCRUD } from "../cruds/Dices.crud";
import { Notes as NotesCRUD } from "../cruds/Notes.crud";
import { Players as PlayersCRUD } from "../cruds/Players.crud";
import { Pulses as PulsesCRUD } from "../cruds/Pulses.crud";
//=============================================================[ < MainFact > ]
export function MainFact({ currentPlayer, nextPlayer }: StepProps) {
  //-------------------------------------------------------------< properties >
  const dices = useContext(DicesCRUD);
  const notes = useContext(NotesCRUD);
  const players = useContext(PlayersCRUD);
  const pulses = useContext(PulsesCRUD);
  //---------------------------------------------------------------------------
  const [state, setState] = useState<StepState>(new PulseRoll());
  //---------------------------------------------------------------------------
  const _this: StepContext = {
    CRUDs: { dices, notes, players, pulses },
    currentPlayer,
    nextPlayer,
    setState,
  };
  //-----------------------------------------------------------------< return >
  return (
    <>
      <Displayer>
        <Pulses />
        <Dices />
      </Displayer>

      {state.draw(_this)}
    </>
  );
}
