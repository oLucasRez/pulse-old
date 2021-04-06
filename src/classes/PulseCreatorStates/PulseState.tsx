//---------------------------------------------------------------< interfaces >
import { PulseCreatorState, PulseCreatorContext } from ".";
//------------------------------------------------------------------< helpers >
import { sub, mod } from "../../helpers/Vector.helper";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Circle } from "../../components/SVGComponents/Circle";
//===========================================================[ < PulseState > ]
export class PulseState implements PulseCreatorState {
  public handleMove(ctx: PulseCreatorContext, e: MouseEvent<SVG>) {
    const { gapState, origin } = ctx;
    const [, setGap] = gapState;
    const { clientX: x, clientY: y } = e;

    const d = sub({ x, y }, origin);
    const gap = mod(d);

    setGap(gap);
  }

  public handleClick(ctx: PulseCreatorContext, e: MouseEvent<SVG>) {
    const { addPulse, origin, gapState, amount, color, onPulse } = ctx;
    const [gap] = gapState;

    const pulse = {
      origin,
      gap,
      amount,
      color,
    };

    addPulse(pulse);

    onPulse(pulse);
  }

  public draw(ctx: PulseCreatorContext) {
    const { origin, gapState, color, amount } = ctx;
    const [gap] = gapState;

    const pulses = [];

    pulses.push(
      <Circle key={1} type="main" origin={origin} radius={gap} stroke={color} />
    );

    console.log(amount);

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

    console.log(pulses);

    return <>{pulses}</>;
  }
}
