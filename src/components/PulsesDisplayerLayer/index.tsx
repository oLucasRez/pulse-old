//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
import { Pulse } from "../Pulse";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//=================================================[ < PulsesDisplayerLayer > ]
export function PulsesDisplayerLayer() {
  //-------------------------------------------------------------< properties >
  const { pulses } = useContext(PulsesContext);
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
