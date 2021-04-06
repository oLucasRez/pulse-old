import { WindowContext, WindowState } from ".";
import { DiceRollerLayer } from "../../components/Layers/DiceRollerLayer";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { mult, norm, sub, sum, zero } from "../../helpers/Vector.helper";
import { Dice } from "../../types/Dice.type";
import { DefineObjectsState } from "./DefineObjectsState";

//==============================================[ < InitialPositioningState > ]
export class InitialPositioningState implements WindowState {
  public handleRoll(ctx: WindowContext, dice: Dice) {
    const { pulsesContext, dicesContext, currentPlayer, setState } = ctx;
    const { getPulse, updatePulse } = pulsesContext;
    const { updateDice } = dicesContext;

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

    setState(new DefineObjectsState());
  }

  public draw(ctx: WindowContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <DiceRollerLayer
          dice={getDice(currentPlayer.color)}
          onRoll={(dice) => this.handleRoll(ctx, dice)}
        >
          <ObjectLabels />
        </DiceRollerLayer>
      </>
    );
  }
}
