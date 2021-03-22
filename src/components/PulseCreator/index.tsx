//--------------------------------------------------------------------< hooks >
import { PulsesContext } from "../../contexts/PulsesContext";
//-----------------------------------------------------------------< contexts >
import { useCallback, useContext, useState } from "react";
//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { IPulse } from "../../types/IPulse";
import { MouseEvent } from "react";
interface PulseCreatorProps {
  x: number;
  y: number;
  color: string;
}
//=========================================================[ < PulseCreator > ]
export function PulseCreator({ x, y, color }: PulseCreatorProps) {
  //-------------------------------------------------------------< properties >
  const [pulse, setPulse] = useState<IPulse>({
    x,
    y,
    gap: 1,
    amount: 1,
    color,
  });
  const { addPulse } = useContext(PulsesContext);
  const [state, setState] = useState<"gap" | "amount">("gap");
  //----------------------------------------------------------------< methods >
  function handleMouseMove(e: MouseEvent<SVGSVGElement>) {
    const deltaX = e.clientX - x;
    const deltaY = e.clientY - y;
    const modDelta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (state === "gap") setPulse({ ...pulse, gap: modDelta });
    if (state === "amount")
      setPulse({ ...pulse, amount: Math.floor(modDelta / pulse.gap + 1) });
  }

  function handleClick() {
    if (state === "gap") setState("amount");
    if (state === "amount") addPulse(pulse);
  }
  //---------------------------------------------------------------------------
  const drawPulses = useCallback(
    function () {
      const { x, y, gap, amount, color } = pulse;

      const pulses = [];

      if (state === "gap") {
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
      }
      if (state === "amount") {
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
      }

      return pulses;
    },
    [pulse, state]
  );
  //-----------------------------------------------------------------< return >
  console.log("pulse-creator rendered");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="pulse-creator-container"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <circle className="center" cx={x} cy={y} fill={`var(--${color})`} />
      {drawPulses()}
    </svg>
  );
}
