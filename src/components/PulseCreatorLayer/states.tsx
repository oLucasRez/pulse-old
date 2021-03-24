//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
//------------------------------------------------------------------< helpers >
import { subtract, mod } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IColor } from "../../types/IColor";
import { IPulse } from "../../types/IPulse";
import { IDispatcher } from "../../types/IDispatcher";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
export interface IContext {
  color: IColor;
  addPulse: (pulse: IPulse) => void;
  pulse: IPulse | undefined;
  setPulse: IDispatcher<IPulse | undefined>;
  setState: IDispatcher<IState>;
}
export interface IState {
  handleMouseMove(ctx: IContext, e: MouseEvent<ISVG>): void;
  handleClick(ctx: IContext, e: MouseEvent<ISVG>): void;
  drawPulses(ctx: IContext): JSX.Element[] | void;
}
//========================================================[ < PositionState > ]
export class PositionState implements IState {
  public handleMouseMove() {}

  public handleClick(ctx: IContext, e: MouseEvent<ISVG>) {
    const { setPulse, color, setState } = ctx;
    const { clientX: x, clientY: y } = e;

    setPulse({ origin: { x, y }, gap: 1, amount: 1, color });

    setState(new GapState());
  }

  public drawPulses() {}
}
//=============================================================[ < GapState > ]
export class GapState implements IState {
  public handleMouseMove(ctx: IContext, e: MouseEvent<ISVG>) {
    if (!ctx.pulse) return;

    const { pulse, setPulse } = ctx;
    const { clientX: x, clientY: y } = e;

    const d = subtract({ x, y }, pulse.origin);
    const gap = mod(d);

    setPulse({ ...pulse, gap });
  }

  public handleClick(ctx: IContext) {
    const { setState } = ctx;

    setState(new AmountState());
  }

  public drawPulses(ctx: IContext) {
    if (!ctx.pulse) return;

    const { origin, gap, color } = ctx.pulse;

    const pulses = [];

    pulses.push(
      <Circle key={1} type="main" origin={origin} radius={gap} stroke={color} />
    );

    for (let i = 2; i <= 10; i++) {
      pulses.push(
        <Circle
          key={i}
          type="display"
          origin={origin}
          radius={gap * i}
          stroke="line"
        />
      );
    }

    return pulses;
  }
}
//==========================================================[ < AmountState > ]
export class AmountState implements IState {
  public handleMouseMove(ctx: IContext, e: MouseEvent<ISVG>) {
    if (!ctx.pulse) return;

    const { pulse, setPulse } = ctx;
    const { clientX: x, clientY: y } = e;

    const d = subtract({ x, y }, pulse.origin);
    const amount = Math.floor(mod(d) / pulse.gap + 1);

    setPulse({ ...pulse, amount });
  }

  public handleClick(ctx: IContext) {
    if (!ctx.pulse) return this;

    const { addPulse, pulse, setState } = ctx;

    addPulse(pulse);
    setState(new PositionState());
  }

  public drawPulses(ctx: IContext) {
    if (!ctx.pulse) return [];

    const { origin, gap, amount, color } = ctx.pulse;

    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <Circle
          key={i}
          type="main"
          origin={origin}
          radius={gap * i}
          stroke={color}
        />
      );
    }

    return pulses;
  }
}
