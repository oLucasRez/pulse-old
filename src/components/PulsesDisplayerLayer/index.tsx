//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Pulse } from "../Pulse";
//--------------------------------------------------------------------< hooks >
import { useContext, useEffect } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//=================================================[ < PulsesDisplayerLayer > ]
export function PulsesDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { clearPulses, addPulse, pulses } = useContext(PulsesContext);
  //----------------------------------------------------------------< methods >
  useEffect(() => {
    clearPulses();
    addPulse({
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      amount: 3,
      gap: 35,
      color: "foreground",
    });
  }, []);
  //-----------------------------------------------------------------< return >
  console.log("pulses-displayer-layer render");
  return (
    <Layer>
      {pulses.map((pulse, index) => (
        <Pulse key={index} pulse={pulse} />
      ))}
    </Layer>
  );
}
