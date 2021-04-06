import { WindowContext, WindowState } from ".";
import { DicesDisplayerLayer } from "../../components/Layers/DicesDisplayerLayer";
import { PulsesDisplayerLayer } from "../../components/Layers/PulsesDisplayerLayer";
import { TextareaLayer } from "../../components/Layers/TextareaLayer";
import { ObjectLabels } from "../../components/ObjectLabels";
import { FirstPulsesRollState } from "./FirstPulsesRollState";
import { InitialPositioningState } from "./InitialPositioningState";

//===================================================[ < DefineObjectsState > ]
export class DefineObjectsState implements WindowState {
  public handleText(ctx: WindowContext, text: string) {
    const {
      playersContext,
      nextPlayer,
      setState,
      dicesContext,
      currentPlayer,
    } = ctx;
    const { updatePlayer } = playersContext;
    const { getDice } = dicesContext;

    updatePlayer(getDice(currentPlayer.color).color, { object: text });

    setState(new InitialPositioningState());

    nextPlayer(1);
  }

  public handleStepFinish(ctx: WindowContext) {
    const { setState } = ctx;

    setState(new FirstPulsesRollState());
  }

  public draw(ctx: WindowContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    const dice = getDice(currentPlayer.color);

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <TextareaLayer
          dice={dice}
          onText={(text) => this.handleText(ctx, text)}
        >
          <ObjectLabels />
        </TextareaLayer>
      </>
    );
  }
}
