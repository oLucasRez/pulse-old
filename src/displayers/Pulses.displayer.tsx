//---------------------------------------------------------------< components >
import { Pulse } from "../views/Pulse.view";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { Pulses as PulsesCRUD } from "../cruds/Pulses.crud";
//===============================================================[ < Pulses > ]
export function Pulses() {
  //-------------------------------------------------------------< properties >
  const { pulses } = useContext(PulsesCRUD);
  //-----------------------------------------------------------------< return >
  console.log("pulses-displayer layer render");
  return (
    <>
      {pulses.map((pulse, index) => (
        <Pulse key={index} {...pulse} />
      ))}
    </>
  );
}
