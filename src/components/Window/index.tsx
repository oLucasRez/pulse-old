//---------------------------------------------------------------< components >
import { MagnetCursorLayer } from "../MagnetCursorLayer";
import { PlayersDisplayerLayer } from "../PlayersDisplayerLayer";
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
import { DiceRollerLayer } from "../DiceRollerLayer";
//--------------------------------------------------------------------< hooks >
import { useContext, useEffect } from "react";
//-----------------------------------------------------------------< contexts >
import { GameContext } from "../../contexts/GameContext";
import { DicesContext } from "../../contexts/DicesContext";
import { PulsesContext } from "../../contexts/PulsesContext";
import { mult, norm, sub, sum, zero } from "../../helpers/vectorHelper";
//===============================================================[ < Window > ]
export function Window() {
  //-------------------------------------------------------------< properties >
  const { step, nextStep, nextPlayer, currentPlayer } = useContext(GameContext);
  const { getDiceByPlayer, updateDice, rolled } = useContext(DicesContext);
  const { updatePulse, getPulse } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const currentDice = getDiceByPlayer(currentPlayer);
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    if (!currentDice) return;

    const mainAmount = getPulse("foreground")?.amount ?? 0;
    updatePulse("foreground", {
      amount: mainAmount < currentDice.value ? currentDice.value : mainAmount,
    });
    const mainPulse = getPulse("foreground");

    if (!mainPulse) return;

    const distPulseDice = sub(currentDice.origin ?? zero, mainPulse.origin);
    const dicePositionMagnitude = currentDice.value * mainPulse.gap;
    const relDicePosition = mult(norm(distPulseDice), dicePositionMagnitude);
    const absDicePosition = sum(relDicePosition, mainPulse.origin);

    updateDice(currentPlayer.color, { origin: absDicePosition });
    console.log(currentDice);
    // nextPlayer();
    // nextStep();
  }, [rolled]);
  //---------------------------------------------------------------------------
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  switch (step) {
    case "elements-creation":
      return (
        <>
          {/* <MagnetCursorLayer /> */}
          <PulsesDisplayerLayer />
          <PlayersDisplayerLayer />
          {/* <PulseCreatorLayer color="orange" /> */}
          {currentDice && <DiceRollerLayer dice={currentDice} />}
        </>
      );
    default:
      return <></>;
  }
}
