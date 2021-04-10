//---------------------------------------------------------------------< tags >
import { Circle } from "../tags/Circle.tag";
//--------------------------------------------------------------------< types >
import { Pulse as Props } from "../types/Pulse.type";
//================================================================[ < Pulse > ]
export function Pulse({ origin, gap, amount, color }: Props) {
  //----------------------------------------------------------------< methods >
  function drawPulses() {
    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <Circle
          key={i}
          type="display"
          origin={origin}
          radius={gap * i}
          stroke={color}
        />
      );
    }

    return pulses;
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse view render");
  return (
    <g className="pulse-container">
      <Circle type="center" origin={origin} fill={color} />
      {drawPulses()}
    </g>
  );
}
