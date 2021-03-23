//----------------------------------------------------------------< functions >
import { memo } from "react";
//--------------------------------------------------------------------< types >
import { IPulse } from "../../types/IPulse";
import { MouseEvent } from "react";
import { Circle } from "../../types/Circle";
interface PulseProps {
  pulse: IPulse;
}
//================================================================[ < Pulse > ]
function Pulse({ pulse }: PulseProps) {
  //-------------------------------------------------------------< properties >
  const { x, y, gap, amount, color } = pulse;
  //----------------------------------------------------------------< methods >
  function handleMouseEnter(e: MouseEvent<Circle>) {
    e.currentTarget.style.opacity = "1";
  }

  function handleMouseOut(e: MouseEvent<Circle>) {
    e.currentTarget.style.opacity = "0";
  }
  //---------------------------------------------------------------------------
  function drawPulses() {
    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <g key={i}>
          <circle
            className="display"
            cx={x}
            cy={y}
            r={gap * i}
            stroke={`var(--${color})`}
          />
          <circle
            className="hover"
            cx={x}
            cy={y}
            r={gap * i}
            stroke={`var(--${color})`}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
          />
        </g>
      );
    }

    return pulses;
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse rendered");
  return (
    <g className="pulse-container">
      <circle className="center" cx={x} cy={y} fill={`var(--${color})`} />
      {drawPulses()}
    </g>
  );
}

export default memo(Pulse);
