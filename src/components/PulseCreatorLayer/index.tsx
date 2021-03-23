//------------------------------------------------------------------< classes >
import { PulseCreatorState, PositionState } from "./states";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//--------------------------------------------------------------------< types >
import { IPulse } from "../../types/IPulse";
import { IContext } from "./states";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG";
import { Layer } from "../Layer";
interface Props {
  color: string;
}
//====================================================[ < PulseCreatorLayer > ]
export function PulseCreatorLayer({ color }: Props) {
  //-------------------------------------------------------------< properties >
  const { addPulse } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const [pulse, setPulse] = useState<IPulse>();
  const [state, setState] = useState<PulseCreatorState>(new PositionState());
  //---------------------------------------------------------------------------
  const _this: IContext = { color, addPulse, pulse, setPulse, setState };
  //----------------------------------------------------------------< methods >
  function handleMouseMove(e: MouseEvent<SVG>) {
    state.handleMouseMove(_this, e);
  }

  function handleClick(e: MouseEvent<SVG>) {
    state.handleClick(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse-creator rendered");
  return (
    <Layer onMouseMove={handleMouseMove} onClick={handleClick}>
      {pulse && (
        <circle
          className="center"
          cx={pulse.x}
          cy={pulse.y}
          fill={`var(--${color})`}
        />
      )}
      {state.drawPulses(_this)}
    </Layer>
  );
}
