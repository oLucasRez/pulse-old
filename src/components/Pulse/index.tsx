//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
//--------------------------------------------------------------------< types >
import { IPulse } from "../../types/IPulse";
interface IProps {
  pulse: IPulse;
}
//================================================================[ < Pulse > ]
export function Pulse({ pulse }: IProps) {
  //-------------------------------------------------------------< properties >
  const { origin, gap, amount, color } = pulse;
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
