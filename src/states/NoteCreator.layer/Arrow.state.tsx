//---------------------------------------------------------------< interfaces >
import {
  NoteCreatorState,
  NoteCreatorContext,
} from "../../interfaces/NoteCreator";
//------------------------------------------------------------------< classes >
import { Text } from "./Text.state";
//---------------------------------------------------------------< components >
import { Arrow as ArrowView } from "../../views/Arrow.view";
import { InputText } from "../../components/InputText";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//================================================================[ < Arrow > ]
export class Arrow implements NoteCreatorState {
  //-------------------------------------------------------------< handleMove >
  public handleMove(ctx: NoteCreatorContext, e: MouseEvent<SVG>) {
    const { toState } = ctx;
    const [, setTo] = toState;

    setTo({ x: e.clientX, y: e.clientY });
  }
  //------------------------------------------------------------< handleClick >
  public handleClick(ctx: NoteCreatorContext) {
    const { setState } = ctx;

    setState(new Text());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: NoteCreatorContext) {
    const { from, toState, color, max } = ctx;
    const [to] = toState;

    return (
      <>
        <ArrowView {...{ from, to, color }} />
        <InputText {...{ origin: to, color, max }} />
      </>
    );
  }
}
