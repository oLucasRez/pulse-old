//------------------------------------------------------------------< classes >
import { ArrowState } from "./states";
//---------------------------------------------------------------< components >
import { Layer } from "../Layer";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { LayerProps } from "../Layer";
import { IVector } from "../../types/IVector";
import { IColor } from "../../types/IColor";
import { INote } from "../../types/INote";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
import { IState, IContext } from "./states";
interface IProps extends LayerProps {
  from: IVector;
  color: IColor;
  max?: number;
  onNote: (note: INote) => void;
}
//=====================================================[ < NoteCreatorLayer > ]
export function NoteCreatorLayer({
  from,
  color,
  max,
  onNote,
  ...props
}: IProps) {
  //-------------------------------------------------------------< properties >
  const toState = useState(from);
  const [state, setState] = useState<IState>(new ArrowState());
  //---------------------------------------------------------------------------
  const _this: IContext = { from, toState, color, max, onNote, setState };
  //----------------------------------------------------------------< methods >
  function handleMove(e: MouseEvent<ISVG>) {
    if (state.handleMove) state.handleMove(_this, e);
  }

  function handleClick(e: MouseEvent<ISVG>) {
    if (state.handleClick) state.handleClick(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("arrow-text-layer render");
  return (
    <Layer {...props} onClick={handleClick} onMouseMove={handleMove}>
      {state.draw(_this)}
    </Layer>
  );
}
