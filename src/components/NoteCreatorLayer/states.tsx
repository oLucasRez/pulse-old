//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { Arrow } from "../Arrow";
import { InputText } from "../InputText";
import { IDispatcher } from "../../types/IDispatcher";
import { INote } from "../../types/INote";
export interface IContext {
  from: IVector;
  toState: [IVector, IDispatcher<IVector>];
  color: IColor;
  max?: number;
  onNote: (note: INote) => void;
  setState: IDispatcher<IState>;
}
export interface IState {
  handleMove?(ctx: IContext, e: MouseEvent<ISVG>): void;
  handleClick?(ctx: IContext, e: MouseEvent<ISVG>): void;
  draw(ctx: IContext): JSX.Element;
}
//===========================================================[ < ArrowState > ]
export class ArrowState implements IState {
  public handleMove(ctx: IContext, e: MouseEvent<ISVG>) {
    const { toState } = ctx;
    const [, setTo] = toState;

    setTo({ x: e.clientX, y: e.clientY });
  }

  public handleClick(ctx: IContext, e: MouseEvent<ISVG>) {
    const { setState } = ctx;

    setState(new TextState());
  }

  public draw(ctx: IContext) {
    const { from, toState, color, max } = ctx;
    const [to] = toState;

    return (
      <>
        <Arrow arrow={{ from, to, color }} />
        <InputText origin={to} color={color} max={max} />
      </>
    );
  }
}
//============================================================[ < TextState > ]
export class TextState implements IState {
  handleText(ctx: IContext, text: string) {
    const { from, toState, onNote, color, setState } = ctx;
    const [to] = toState;

    onNote({
      arrow: {
        color,
        from,
        to,
      },
      question: { text, color },
      answers: [],
    });

    setState(new DoneState());
  }

  public draw(ctx: IContext) {
    const { from, toState, color, max } = ctx;
    const [to] = toState;

    return (
      <>
        <Arrow arrow={{ from, to, color }} />
        <InputText
          origin={to}
          color={color}
          max={max}
          onText={(text) => this.handleText(ctx, text)}
        />
      </>
    );
  }
}
//============================================================[ < DoneState > ]
export class DoneState implements IState {
  public draw() {
    return <></>;
  }
}
