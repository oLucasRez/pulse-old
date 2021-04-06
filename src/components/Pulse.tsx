//---------------------------------------------------------------< components >
import { Circle } from "./SVGComponents/Circle";
//--------------------------------------------------------------------< types >
import { Pulse as PulseProps } from "../types/Pulse.type";
//================================================================[ < Pulse > ]
export function Pulse({ origin, gap, amount, color }: PulseProps) {
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
  console.log("pulse render");
  return (
    <g className="pulse-container">
      <Circle type="center" origin={origin} fill={color} />
      {drawPulses()}
    </g>
  );
}
