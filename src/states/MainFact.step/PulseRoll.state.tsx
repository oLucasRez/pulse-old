//---------------------------------------------------------------< interfaces >
import { StepState, StepContext } from "../../interfaces/Step";
//------------------------------------------------------------------< classes >
import { PulseDraw } from "./PulseDraw.state";
//---------------------------------------------------------------< components >
import { DiceRoller } from "../../layers/DiceRoller.layer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { Notes } from "../../displayers/Notes.displayer";
//--------------------------------------------------------------------< types >
import { Dice } from "../../types/Dice.type";
//============================================================[ < PulseRoll > ]
export class PulseRoll implements StepState {
  //-------------------------------------------------------------< handleRoll >
  handleRoll(ctx: StepContext, dice: Dice) {
    const { CRUDs, setState } = ctx;
    const { updateDice } = CRUDs.dices;

    updateDice(dice.color, { value: dice.value });

    setState(new PulseDraw());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: StepContext) {
    const { CRUDs, currentPlayer } = ctx;
    const { getDice } = CRUDs.dices;

    const currentDice = getDice(currentPlayer.color);

    return (
      <DiceRoller
        dice={{ ...currentDice, value: 0 }}
        onRoll={(dice) => this.handleRoll(ctx, dice)}
      >
        <ObjectLabels />
        <Notes />
      </DiceRoller>
    );
  }
}
