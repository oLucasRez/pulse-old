//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Dice } from "../Dice";
import Pulse from "../Pulse";
//--------------------------------------------------------------------< hooks >
import { useContext, useEffect } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//=================================================[ < PulsesDisplayerLayer > ]
export function PulsesDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { addPulse, pulses } = useContext(PulsesContext);
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
  //-----------------------------------------------------------------< return >
  return (
    <Layer>
      <Dice x={50} y={50} sides={5} currentValue={15} color="blue" />
      {pulses.map((pulse, index) => (
        <Pulse key={index} pulse={pulse} />
      ))}
    </Layer>
  );
}
