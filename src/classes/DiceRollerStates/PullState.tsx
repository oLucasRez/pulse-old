//---------------------------------------------------------------< interfaces >
import { DiceRollerContext, DiceRollerState } from ".";
//------------------------------------------------------------------< classes >
import { WarnState } from "./WarnState";
import { ThrowState } from "./ThrowState";
//---------------------------------------------------------------< components >
import { Circle } from "../../components/SVGComponents/Circle";
import { Line } from "../../components/SVGComponents/Line";
import { Dice } from "../../components/Dice";
//------------------------------------------------------------------< helpers >
import { mod, sub } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//============================================================[ < PullState > ]
export class PullState implements DiceRollerState {
  public handleMove(ctx: DiceRollerContext, e: MouseEvent<SVG>) {
    const { originState, pullState } = ctx;
    const [origin] = originState;
    const [, setPull] = pullState;

    const { clientX: mouseX, clientY: mouseY } = e;

    const xSign = mouseX - origin.x < 0 ? -1 : 1;
    const x = Math.pow(Math.abs(mouseX - origin.x), 0.9) * xSign + origin.x;
    const ySign = mouseY - origin.y < 0 ? -1 : 1;
    const y = Math.pow(Math.abs(mouseY - origin.y), 0.9) * ySign + origin.y;

    setPull({ x, y });
  }

  public handleUp(ctx: DiceRollerContext) {
    const { originState, pullState, setState } = ctx;
    const [origin] = originState;
    const [pull] = pullState;

    if (mod(sub(pull, origin)) < 50) setState(new WarnState());
    else setState(new ThrowState());
  }

  public draw(ctx: DiceRollerContext): JSX.Element {
    const { originState, dice, pullState } = ctx;
    const [origin] = originState;
    const [pull] = pullState;

    return (
      <>
        <Circle type="center" origin={origin} fill={dice.color} />
        <Line from={origin} to={pull} stroke={dice.color} />
        <Dice {...{ ...dice, origin: pull, value: dice.sides }} />
      </>
    );
  }
}
