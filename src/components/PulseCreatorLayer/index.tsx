//------------------------------------------------------------------< classes >
import { PositionState } from "./states";
//---------------------------------------------------------------< components >
import { Circle } from "../SVGComponents/Circle";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//--------------------------------------------------------------------< types >
import { IColor } from "../../types/IColor";
import { IPulse } from "../../types/IPulse";
import { IState, IContext } from "./states";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
import { Layer } from "../Layer";
interface IProps {
  color: IColor;
}
//====================================================[ < PulseCreatorLayer > ]
export function PulseCreatorLayer({ color }: IProps) {
  //-------------------------------------------------------------< properties >
  const { addPulse } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const [pulse, setPulse] = useState<IPulse>();
  const [state, setState] = useState<IState>(new PositionState());
  //---------------------------------------------------------------------------
  const _this: IContext = { color, addPulse, pulse, setPulse, setState };
  //----------------------------------------------------------------< methods >
  function handleMouseMove(e: MouseEvent<ISVG>) {
    state.handleMouseMove(_this, e);
  }

  function handleClick(e: MouseEvent<ISVG>) {
    state.handleClick(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse-creator-layer render");
  return (
    <Layer onMouseMove={handleMouseMove} onClick={handleClick}>
      {pulse && <Circle type="center" origin={pulse.origin} fill={color} />}
      {state.drawPulses(_this)}
    </Layer>
  );
}
