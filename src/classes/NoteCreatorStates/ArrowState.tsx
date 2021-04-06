//---------------------------------------------------------------< interfaces >
import { NoteCreatorState, NoteCreatorContext } from ".";
//------------------------------------------------------------------< classes >
import { TextState } from "./TextState";
//---------------------------------------------------------------< components >
import { Arrow } from "../../components/Arrow";
import { InputText } from "../../components/InputText";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//===========================================================[ < ArrowState > ]
export class ArrowState implements NoteCreatorState {
  public handleMove(ctx: NoteCreatorContext, e: MouseEvent<SVG>) {
    const { toState } = ctx;
    const [, setTo] = toState;

    setTo({ x: e.clientX, y: e.clientY });
  }

  public handleClick(ctx: NoteCreatorContext) {
    const { setState } = ctx;

    setState(new TextState());
  }

  public draw(ctx: NoteCreatorContext) {
    const { from, toState, color, max } = ctx;
    const [to] = toState;

    return (
      <>
        <Arrow {...{ from, to, color }} />
        <InputText {...{ origin: to, color, max }} />
      </>
    );
  }
}
