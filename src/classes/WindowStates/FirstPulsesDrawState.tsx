import { WindowContext, WindowState } from ".";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { PulseCreatorLayer } from "../../components/Layers/PulseCreatorLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { zero } from "../../helpers/Vector.helper";
import { DefineMainFactState } from "./DefineMainFactState";
import { FirstPulsesRollState } from "./FirstPulsesRollState";

//=================================================[ < FirstPulsesDrawState > ]
export class FirstPulsesDrawState implements WindowState {
  public handlePulse(ctx: WindowContext) {
    const { nextPlayer, setState } = ctx;

    setState(new FirstPulsesRollState());

    nextPlayer(-1);
  }

  public handleStepFinish(ctx: WindowContext) {
    const { setState } = ctx;

    setState(new DefineMainFactState());
  }

  public draw(ctx: WindowContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <PulseCreatorLayer
          pulseTrackable
          crossingTrackable
          origin={getDice(currentPlayer.color).origin ?? zero}
          amount={getDice(currentPlayer.color).value}
          color={getDice(currentPlayer.color).color}
          onPulse={() => this.handlePulse(ctx)}
        >
          <ObjectLabels />
        </PulseCreatorLayer>
      </>
    );
  }
}
