//---------------------------------------------------------------< interfaces >
import {
  NoteCreatorState,
  NoteCreatorContext,
} from "../../classes/NoteCreatorStates";
//------------------------------------------------------------------< classes >
import { ArrowState } from "../../classes/NoteCreatorStates/ArrowState";
//---------------------------------------------------------------< components >
import { Layer } from ".";
//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//--------------------------------------------------------------------< types >
import { LayerProps } from ".";
import { Vector } from "../../types/Vector.type";
import { Color } from "../../types/Color.type";
import { Note } from "../../types/Note.type";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";

interface Props extends LayerProps {
  from: Vector;
  color: Color;
  max?: number;
  onNote: (note: Note) => void;
}
//=====================================================[ < NoteCreatorLayer > ]
export function NoteCreatorLayer({
  from,
  color,
  max,
  onNote,
  children,
  ...props
}: Props) {
  //-------------------------------------------------------------< properties >
  const toState = useState(from);
  const [state, setState] = useState<NoteCreatorState>(new ArrowState());
  //---------------------------------------------------------------------------
  const _this: NoteCreatorContext = {
    from,
    toState,
    color,
    max,
    onNote,
    setState,
  };
  //----------------------------------------------------------------< methods >
  function handleMove(e: MouseEvent<SVG>) {
    if (state.handleMove) state.handleMove(_this, e);
  }

  function handleClick(e: MouseEvent<SVG>) {
    if (state.handleClick) state.handleClick(_this, e);
  }
  //-----------------------------------------------------------------< return >
  console.log("note-creator-layer render");
  return (
    <Layer {...props} onClick={handleClick} onMouseMove={handleMove}>
      {state.draw && state.draw(_this)}

      {children}
    </Layer>
  );
}
