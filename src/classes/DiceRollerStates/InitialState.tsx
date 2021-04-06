//---------------------------------------------------------------< interfaces >
import { DiceRollerContext, DiceRollerState } from ".";
//------------------------------------------------------------------< classes >
import { PullState } from "./PullState";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//=========================================================[ < InitialState > ]
export class InitialState implements DiceRollerState {
  public handleDown(ctx: DiceRollerContext, e: MouseEvent<SVG>) {
    const { originState, pullState, setState } = ctx;
    const [, setOrigin] = originState;
    const [, setPull] = pullState;

    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }
}
