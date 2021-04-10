//---------------------------------------------------------------< interfaces >
import { StepState, StepContext } from "../../interfaces/Step";
//------------------------------------------------------------------< classes >
import { DefineObject } from "./DefineObject.state";
//---------------------------------------------------------------< components >
import { DiceRoller } from "../../layers/DiceRoller.layer";
import { ObjectLabels } from "../../components/ObjectLabels";
//------------------------------------------------------------------< helpers >
import { mult, norm, sub, sum, zero } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { Dice } from "../../types/Dice.type";
//============================================================[ < PlaceDice > ]
export class PlaceDice implements StepState {
  //-------------------------------------------------------------< handleRoll >
  handleRoll(ctx: StepContext, dice: Dice) {
    const { CRUDs, currentPlayer, setState } = ctx;
    const { getPulse, updatePulse } = CRUDs.pulses;
    const { updateDice } = CRUDs.dices;

    const mainAmount = getPulse("foreground").amount;
    updatePulse("foreground", {
      amount: mainAmount < dice.value ? dice.value : mainAmount,
    });
    const mainPulse = getPulse("foreground");

    if (!mainPulse) return;

    const distPulseDice = sub(dice.origin ?? zero, mainPulse.origin);
    const dicePositionMag = dice.value * mainPulse.gap;
    const relDicePosition = mult(norm(distPulseDice), dicePositionMag);
    const absDicePosition = sum(relDicePosition, mainPulse.origin);

    updateDice(currentPlayer.color, {
      origin: absDicePosition,
      value: dice.value,
    });

    setState(new DefineObject());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: StepContext) {
    const { CRUDs, currentPlayer } = ctx;
    const { getDice } = CRUDs.dices;

    return (
      <DiceRoller
        dice={getDice(currentPlayer.color)}
        onRoll={(dice) => this.handleRoll(ctx, dice)}
      >
        <ObjectLabels />
      </DiceRoller>
    );
  }
}
