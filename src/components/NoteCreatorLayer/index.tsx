//---------------------------------------------------------------< components >
import { Layer, LayerProps } from "../Layer";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { MouseEvent } from "react";
import { ISVG } from "../../types/ISVG";
import { IColor } from "../../types/IColor";
import { ArrowState, IContext, IState } from "./states";
import { INote } from "../../types/INote";
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
  const [to, setTo] = useState(from);
  const [state, setState] = useState<IState>(new ArrowState());
  //---------------------------------------------------------------------------
  const _this: IContext = { from, to, setTo, color, max, onNote, setState };
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
