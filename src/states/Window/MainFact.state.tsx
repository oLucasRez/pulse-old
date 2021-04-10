//---------------------------------------------------------------< interfaces >
import { WindowState, WindowContext } from "../../interfaces/Window";
//---------------------------------------------------------------< components >
import { MainFact as MainFactStep } from "../../steps/MainFact.step";
//=============================================================[ < MainFact > ]
export class MainFact implements WindowState {
  //---------------------------------------------------------------< nextStep >
  public nextStep(ctx: WindowContext) {
    const { setState } = ctx;

    setState(this); // temporario
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: WindowContext) {
    const { currentPlayer, nextPlayer } = ctx;

    return (
      <MainFactStep
        currentPlayer={currentPlayer}
        nextPlayer={() => nextPlayer(-1)}
      />
    );
  }
}
