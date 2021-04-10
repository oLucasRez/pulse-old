//---------------------------------------------------------------< interfaces >
import { StepState, StepContext } from "../../interfaces/Step";
//------------------------------------------------------------------< classes >
import { Write } from "./Write.state";
//---------------------------------------------------------------< components >
import { PulseCreator } from "../../layers/PulseCreator.layer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { Notes } from "../../displayers/Notes.displayer";
//------------------------------------------------------------------< helpers >
import { zero } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { Pulse } from "../../types/Pulse.type";
//============================================================[ < PulseDraw > ]
export class PulseDraw implements StepState {
  //------------------------------------------------------------< handlePulse >
  handlePulse(ctx: StepContext, pulse: Pulse) {
    const { CRUDs, setState } = ctx;
    const { addPulse } = CRUDs.pulses;

    addPulse(pulse);

    setState(new Write());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: StepContext) {
    const { CRUDs, currentPlayer } = ctx;
    const { getDice } = CRUDs.dices;

    const currentDice = getDice(currentPlayer.color);

    return (
      <PulseCreator
        pulseTrackable
        crossingTrackable
        origin={currentDice.origin ?? zero}
        amount={currentDice.value}
        color={currentDice.color}
        onPulse={(pulse) => this.handlePulse(ctx, pulse)}
      >
        <ObjectLabels />
        <Notes />
      </PulseCreator>
    );
  }
}
