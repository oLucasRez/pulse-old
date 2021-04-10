//---------------------------------------------------------------< interfaces >
import {
  DiceRollerContext,
  DiceRollerState,
} from "../../interfaces/DiceRoller";
//------------------------------------------------------------------< classes >
import { Warn } from "./Warn.state";
import { Throw } from "./Throw.state";
//---------------------------------------------------------------< components >
import { Circle } from "../../tags/Circle.tag";
import { Line } from "../../tags/Line.tag";
import { Dice } from "../../views/Dice.view";
//------------------------------------------------------------------< helpers >
import { mod, sub } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
//=================================================================[ < Pull > ]
export class Pull implements DiceRollerState {
  //-------------------------------------------------------------< handleMove >
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
  //---------------------------------------------------------------< handleUp >
  public handleUp(ctx: DiceRollerContext) {
    const { originState, pullState, setState } = ctx;
    const [origin] = originState;
    const [pull] = pullState;

    if (mod(sub(pull, origin)) < 50) setState(new Warn());
    else setState(new Throw());
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: DiceRollerContext) {
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
