//---------------------------------------------------------------< components >
import Pulse from "../Pulse";
import { PulseCreator } from "../PulseCreator";
//--------------------------------------------------------------------< hooks >
import { useContext, useEffect, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//-------------------------------------------------------------------< styles >
import "./styles.css";
//--------------------------------------------------------------------< types >
import { MouseEvent } from "react";
//===============================================================[ < Window > ]
export function Window() {
  //-------------------------------------------------------------< properties >
  const { pulses, addPulse } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [isPulseCreating, setIsPulseCreating] = useState(false);
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    addPulse({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      amount: 3,
      gap: 36,
      color: "foreground",
    });
  }, []);

  useEffect(() => {
    setIsPulseCreating(false);
  }, [pulses]);
  //---------------------------------------------------------------------------
  function handleClick(e: MouseEvent<SVGSVGElement>) {
    setX(e.clientX);
    setY(e.clientY);

    setIsPulseCreating(true);
  }
  //-----------------------------------------------------------------< return >
  console.log("window rendered");
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="window-container"
        onClick={handleClick}
      >
        {pulses.map(({ x, y, gap, amount, color }, index) => (
          <Pulse
            key={index}
            x={x}
            y={y}
            gap={gap}
            amount={amount}
            color={color}
          />
        ))}
      </svg>

      {isPulseCreating && <PulseCreator x={x} y={y} color="orange" />}
    </>
  );
}
