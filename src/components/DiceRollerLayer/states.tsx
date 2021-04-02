//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
import { Line } from "../SVGComponents/Line";
import { Dice } from "../Dice";
import { DynamicDice } from "../DynamicDice";
import { Text } from "../SVGComponents/Text";
//------------------------------------------------------------------< helpers >
import { mod, sub } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IDice } from "../../types/IDice";
import { IVector } from "../../types/IVector";
import { IDispatcher } from "../../types/IDispatcher";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
export interface IContext {
  dice: IDice;
  origin: IVector;
  setOrigin: IDispatcher<IVector>;
  pull: IVector;
  setPull: IDispatcher<IVector>;
  setState: IDispatcher<IState>;
  onRollStop: (dice: IDice) => void;
}
export interface IState {
  handleDown?(ctx: IContext, e: MouseEvent<ISVG>): void;
  handleMove?(ctx: IContext, e: MouseEvent<ISVG>): void;
  handleUp?(ctx: IContext, e: MouseEvent<ISVG>): void;
  draw?(ctx: IContext): JSX.Element;
}
//=======================================================[ < BeginningState > ]
export class BeginningState implements IState {
  public handleDown(ctx: IContext, e: MouseEvent<ISVG>) {
    const { setOrigin, setPull, setState } = ctx;
    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }
}
//============================================================[ < PullState > ]
class PullState implements IState {
  public handleMove(ctx: IContext, e: MouseEvent<ISVG>) {
    const { origin, setPull } = ctx;
    const { clientX: mouseX, clientY: mouseY } = e;

    const xSign = mouseX - origin.x < 0 ? -1 : 1;
    const x = Math.pow(Math.abs(mouseX - origin.x), 0.9) * xSign + origin.x;
    const ySign = mouseY - origin.y < 0 ? -1 : 1;
    const y = Math.pow(Math.abs(mouseY - origin.y), 0.9) * ySign + origin.y;

    setPull({ x, y });
  }

  public handleUp(ctx: IContext) {
    const { origin, pull, setState } = ctx;

    if (mod(sub(pull, origin)) < 50) {
      setState(new WarnState());
    } else {
      setState(new ThrowState());
    }
  }

  public draw(ctx: IContext): JSX.Element {
    const { origin, dice, pull } = ctx;

    return (
      <>
        <Circle type="center" origin={origin} fill={dice.color} />
        <Line from={origin} to={pull} stroke={dice.color} />
        <Dice dice={{ ...dice, origin: pull, value: dice.sides }} />
      </>
    );
  }
}
//============================================================[ < WarnState > ]
class WarnState implements IState {
  public handleDown(ctx: IContext, e: MouseEvent<ISVG>) {
    const { setOrigin, setPull, setState } = ctx;
    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }

  public draw(ctx: IContext) {
    const { origin } = ctx;

    return (
      <Text
        origin={origin}
        fill="line"
        font="sansserif regular"
        size={16}
        justify="middle"
      >
        Clique e arraste para lançar o dado
      </Text>
    );
  }
}
//===========================================================[ < ThrowState > ]
class ThrowState implements IState {
  public handleDown(ctx: IContext, e: MouseEvent<ISVG>) {
    const { setOrigin, setPull, setState } = ctx;
    const { clientX: x, clientY: y } = e;

    setOrigin({ x, y });
    setPull({ x, y });
    setState(new PullState());
  }

  public draw(ctx: IContext) {
    const { origin, pull, dice, setState, onRollStop } = ctx;

    const x = (origin.x - pull.x) * 0.5;
    const y = (origin.y - pull.y) * 0.5;

    return (
      <DynamicDice
        overloadable
        dice={{ ...dice, origin: pull }}
        force={{ x, y }}
        onStop={(dice: IDice) => {
          setState(new BeginningState());
          onRollStop(dice);
        }}
      />
    );
  }
}
