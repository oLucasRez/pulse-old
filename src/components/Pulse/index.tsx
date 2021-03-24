//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
//--------------------------------------------------------------------< types >
import { IPulse } from "../../types/IPulse";
import { MouseEvent } from "react";
import { ICircle } from "../../types/ICircle";
interface IProps {
  pulse: IPulse;
}
//================================================================[ < Pulse > ]
export function Pulse({ pulse }: IProps) {
  //-------------------------------------------------------------< properties >
  const { origin, gap, amount, color } = pulse;
  //----------------------------------------------------------------< methods >
  function handleMouseEnter(e: MouseEvent<ICircle>) {
    e.currentTarget.style.opacity = "1";
  }

  function handleMouseOut(e: MouseEvent<ICircle>) {
    e.currentTarget.style.opacity = "0";
  }
  //---------------------------------------------------------------------------
  function drawPulses() {
    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <g key={i}>
          <Circle
            type="display"
            origin={origin}
            radius={gap * i}
            stroke={color}
          />
          <Circle
            type="hover"
            origin={origin}
            radius={gap * i}
            stroke={color}
            onEnter={handleMouseEnter}
            onOut={handleMouseOut}
          />
        </g>
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
