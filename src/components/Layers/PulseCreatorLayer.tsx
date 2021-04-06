//---------------------------------------------------------------< interfaces >
import {
  PulseCreatorContext,
  PulseCreatorState,
} from "../../classes/PulseCreatorStates";
//------------------------------------------------------------------< classes >
import { PulseState } from "../../classes/PulseCreatorStates/PulseState";
//---------------------------------------------------------------< components >
import { Layer, LayerProps } from ".";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//-----------------------------------------------------------------< contexts >
import { PulsesContext } from "../../contexts/PulsesContext";
//--------------------------------------------------------------------< types >
import { Vector } from "../../types/Vector.type";
import { Color } from "../../types/Color.type";
import { Pulse } from "../../types/Pulse.type";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";

interface IProps extends LayerProps {
  origin: Vector;
  color: Color;
  amount: number;
  onPulse: (pulse: Pulse) => void;
}
//====================================================[ < PulseCreatorLayer > ]
export function PulseCreatorLayer({
  origin,
  color,
  amount,
  onPulse,
  children,
  ...props
}: IProps) {
  //-------------------------------------------------------------< properties >
  const { addPulse } = useContext(PulsesContext);
  //---------------------------------------------------------------------------
  const gapState = useState<number>(0);
  const [state, setState] = useState<PulseCreatorState>(new PulseState());
  //---------------------------------------------------------------------------
  const _this: PulseCreatorContext = {
    origin,
    amount,
    color,
    addPulse,
    gapState,
    setState,
    onPulse,
  };
  console.log(_this);
  //----------------------------------------------------------------< methods >
  function handleMove(e: MouseEvent<SVG>) {
    if (state.handleMove) state.handleMove(_this, e);
  }

  function handleClick(e: MouseEvent<SVG>) {
    if (state.handleClick) state.handleClick(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("pulse-creator-layer render");
  return (
    <Layer {...props} onMouseMove={handleMove} onClick={handleClick}>
      {children}

      {state.draw && state.draw(_this)}
    </Layer>
  );
}
