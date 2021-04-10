//---------------------------------------------------------------< interfaces >
import { WindowState, WindowContext } from "../../interfaces/Window";
//------------------------------------------------------------------< classes >
import { MainFact } from "./MainFact.state";
//---------------------------------------------------------------< components >
import { Setup as SetupStep } from "../../steps/Setup.step";
//================================================================[ < Setup > ]
export class Setup implements WindowState {
  //---------------------------------------------------------------< nextStep >
  public nextStep(ctx: WindowContext) {
    const { setState } = ctx;

    setState(new MainFact());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: WindowContext) {
    const { currentPlayer, nextPlayer } = ctx;

    return (
      <SetupStep
        currentPlayer={currentPlayer}
        nextPlayer={() => nextPlayer(1)}
      />
    );
  }
}
