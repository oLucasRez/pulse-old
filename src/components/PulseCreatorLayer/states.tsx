//--------------------------------------------------------------------< types >
import { StateType } from "../../types/StateType";
import { IPulse } from "../../types/IPulse";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG";
export interface IContext {
  color: string;
  addPulse: (pulse: IPulse) => void;
  pulse: StateType<IPulse | undefined>[0];
  setPulse: StateType<IPulse | undefined>[1];
  setState: StateType<PulseCreatorState>[1];
}
export interface PulseCreatorState {
  handleMouseMove(ctx: IContext, e: MouseEvent<SVG>): void;
  handleClick(ctx: IContext, e: MouseEvent<SVG>): void;
  drawPulses(ctx: IContext): JSX.Element[] | void;
}
//========================================================[ < PositionState > ]
export class PositionState implements PulseCreatorState {
  public handleMouseMove() {}

  public handleClick(ctx: IContext, e: MouseEvent<SVG>) {
    const { setPulse, color, setState } = ctx;
    const { clientX: x, clientY: y } = e;

    setPulse({ x, y, gap: 1, amount: 1, color });

    setState(new GapState());
  }

  public drawPulses() {}
}
//=============================================================[ < GapState > ]
export class GapState implements PulseCreatorState {
  public handleMouseMove(ctx: IContext, e: MouseEvent<SVG>) {
    if (!ctx.pulse) return;

    const { pulse, setPulse } = ctx;
    const { clientX: x, clientY: y } = e;

    const dX = x - pulse.x;
    const dY = y - pulse.y;
    const gap = Math.sqrt(dX * dX + dY * dY);

    setPulse({ ...pulse, gap });

    return;
  }

  public handleClick(ctx: IContext) {
    const { setState } = ctx;

    setState(new AmountState());
  }

  public drawPulses(ctx: IContext) {
    if (!ctx.pulse) return;

    const { x, y, gap, color } = ctx.pulse;

    const pulses = [];

    pulses.push(
      <circle
        key={1}
        className="main"
        cx={x}
        cy={y}
        r={gap}
        stroke={`var(--${color})`}
      />
    );

    for (let i = 2; i <= 10; i++) {
      pulses.push(
        <circle
          key={i}
          className="display"
          cx={x}
          cy={y}
          r={gap * i}
          stroke={`var(--line)`}
        />
      );
    }

    return pulses;
  }
}
//==========================================================[ < AmountState > ]
export class AmountState implements PulseCreatorState {
  public handleMouseMove(ctx: IContext, e: MouseEvent<SVG>) {
    if (!ctx.pulse) return;

    const { pulse, setPulse } = ctx;
    const { clientX: x, clientY: y } = e;

    const dX = x - pulse.x;
    const dY = y - pulse.y;
    const modD = Math.sqrt(dX * dX + dY * dY);
    const amount = Math.floor(modD / pulse.gap + 1);

    setPulse({ ...pulse, amount });

    return;
  }

  public handleClick(ctx: IContext) {
    if (!ctx.pulse) return this;

    const { addPulse, pulse, setState } = ctx;

    addPulse(pulse);
    setState(new PositionState());
  }

  public drawPulses(ctx: IContext) {
    if (!ctx.pulse) return [];

    const { x, y, gap, amount, color } = ctx.pulse;

    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <circle
          key={i}
          className="main"
          cx={x}
          cy={y}
          r={gap * i}
          stroke={`var(--${color})`}
        />
      );
    }

    return pulses;
  }
}
