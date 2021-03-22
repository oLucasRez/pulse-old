//----------------------------------------------------------------< functions >
import { memo } from "react";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
interface PulseProps {
  x: string | number;
  y: string | number;
  gap: number;
  amount: number;
  color: string;
}
//================================================================[ < Pulse > ]
function Pulse({ x, y, amount, gap, color }: PulseProps) {
  //----------------------------------------------------------------< methods >
  function handleMouseEnter(e: MouseEvent<SVGCircleElement>) {
    e.currentTarget.style.opacity = "1";
  }
  function handleMouseOut(e: MouseEvent<SVGCircleElement>) {
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
