//---------------------------------------------------------------< interfaces >
import {
  PulseCreatorState,
  PulseCreatorContext,
} from "../../interfaces/PulseCreator";
//------------------------------------------------------------------< helpers >
import { sub, mod } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Circle } from "../../tags/Circle.tag";
//================================================================[ < Pulse > ]
export class Pulse implements PulseCreatorState {
  //-------------------------------------------------------------< handleMove >
  public handleMove(ctx: PulseCreatorContext, e: MouseEvent<SVG>) {
    const { gapState, origin } = ctx;
    const [, setGap] = gapState;
    const { clientX: x, clientY: y } = e;

    const d = sub({ x, y }, origin);
    const gap = mod(d);

    setGap(gap);
  }
  //------------------------------------------------------------< handleClick >
  public handleClick(ctx: PulseCreatorContext, e: MouseEvent<SVG>) {
    const { origin, gapState, amount, color, onPulse } = ctx;
    const [gap] = gapState;

    const pulse = {
      origin,
      gap,
      amount,
      color,
    };

    onPulse(pulse);
  }
  //-------------------------------------------------------------------< draw >
  public draw(ctx: PulseCreatorContext) {
    const { origin, gapState, color, amount } = ctx;
    const [gap] = gapState;

    const pulses = [];

    pulses.push(
      <Circle key={1} type="main" origin={origin} radius={gap} stroke={color} />
    );

    for (let i = 2; i <= amount; i++) {
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

    return <>{pulses}</>;
  }
}
