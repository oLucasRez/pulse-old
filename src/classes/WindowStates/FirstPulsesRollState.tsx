import { WindowContext, WindowState } from ".";
import { DiceRollerLayer } from "../../components/Layers/DiceRollerLayer";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { Dice } from "../../types/Dice.type";
import { FirstPulsesDrawState } from "./FirstPulsesDrawState";

//=================================================[ < FirstPulsesRollState > ]
export class FirstPulsesRollState implements WindowState {
  public handleRoll(ctx: WindowContext, dice: Dice) {
    const { dicesContext, setState } = ctx;
    const { updateDice } = dicesContext;

    // setMemoDice(dice);
    updateDice(dice.color, { value: dice.value });
    setState(new FirstPulsesDrawState());
  }

  public draw(ctx: WindowContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <DiceRollerLayer
          dice={{ ...getDice(currentPlayer.color), value: 0 }}
          onRoll={(dice) => this.handleRoll(ctx, dice)}
        >
          <ObjectLabels />
        </DiceRollerLayer>
      </>
    );
  }
}
