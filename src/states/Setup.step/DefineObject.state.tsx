//---------------------------------------------------------------< interfaces >
import { StepState, StepContext } from "../../interfaces/Step";
//------------------------------------------------------------------< classes >
import { PlaceDice } from "./PlaceDice.state";
//---------------------------------------------------------------< components >
import { Textarea } from "../../layers/Textarea.layer";
import { ObjectLabels } from "../../components/ObjectLabels";
//=========================================================[ < DefineObject > ]
export class DefineObject implements StepState {
  //-------------------------------------------------------------< handleText >
  handleText(ctx: StepContext, text: string) {
    const { CRUDs, nextPlayer, setState, currentPlayer } = ctx;
    const { updatePlayer } = CRUDs.players;
    const { getDice } = CRUDs.dices;

    updatePlayer(getDice(currentPlayer.color).color, { object: text });

    nextPlayer();

    setState(new PlaceDice());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: StepContext) {
    const { CRUDs, currentPlayer } = ctx;
    const { getDice } = CRUDs.dices;

    const dice = getDice(currentPlayer.color);

    return (
      <Textarea dice={dice} onText={(text) => this.handleText(ctx, text)}>
        <ObjectLabels />
      </Textarea>
    );
  }
}
