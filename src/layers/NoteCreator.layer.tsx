//---------------------------------------------------------------< interfaces >
import {
  NoteCreatorState,
  NoteCreatorContext,
} from "../interfaces/NoteCreator";
//------------------------------------------------------------------< classes >
import { Arrow } from "../states/NoteCreator.layer/Arrow.state";
//---------------------------------------------------------------< components >
import { Layer } from ".";
//--------------------------------------------------------------------< hooks >
import { useContext, useState } from "react";
//--------------------------------------------------------------------< types >
import { LayerProps } from ".";
import { Vector } from "../types/Vector.type";
import { Color } from "../types/Color.type";
import { Note } from "../types/Note.type";
import { MouseEvent } from "react";
import { SVG } from "../types/SVG.type";
import { Notes as NotesCRUD } from "../cruds/Notes.crud";
import { Text } from "../states/NoteCreator.layer/Text.state";

interface Props extends LayerProps {
  from: Vector;
  color: Color;
  max?: number;
  onNote: (note: Note) => void;
}
//==========================================================[ < NoteCreator > ]
export function NoteCreator({
  from,
  color,
  max,
  onNote,
  children,
  ...props
}: Props) {
  //-------------------------------------------------------------< properties >
  const { getNote } = useContext(NotesCRUD);
  const note = getNote(from);
  //---------------------------------------------------------------------------
  const toState = useState(note ? note.arrow.to : from);
  const [state, setState] = useState<NoteCreatorState>(
    note ? new Text() : new Arrow()
  );
  //---------------------------------------------------------------------------
  const _this: NoteCreatorContext = {
    currentText: note?.question.text,
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
