//---------------------------------------------------------------< interfaces >
import {
  PulseCreatorContext,
  PulseCreatorState,
} from "../interfaces/PulseCreator";
//------------------------------------------------------------------< classes >
import { Pulse } from "../states/PulseCreator.layer/Pulse.state";
//---------------------------------------------------------------< components >
import { Layer, LayerProps } from ".";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Color } from "../types/Color.type";
import { Pulse as PulseType } from "../types/Pulse.type";
import { MouseEvent } from "react";
import { SVG } from "../types/SVG.type";

interface Props extends LayerProps {
  origin: Vector;
  color: Color;
  amount: number;
  onPulse: (pulse: PulseType) => void;
}
//=========================================================[ < PulseCreator > ]
export function PulseCreator({
  origin,
  color,
  amount,
  onPulse,
  children,
  ...props
}: Props) {
  //-------------------------------------------------------------< properties >
  const gapState = useState<number>(0);
  const [state, setState] = useState<PulseCreatorState>(new Pulse());
  //---------------------------------------------------------------------------
  const _this: PulseCreatorContext = {
    origin,
    amount,
    color,
    gapState,
    setState,
    onPulse,
  };
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
