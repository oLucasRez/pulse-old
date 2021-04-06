import { Vector } from "../../types/Vector.type";
import { Color } from "../../types/Color.type";
import { Note } from "../../types/Note.type";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { StateHook } from "../../types/StateHook.type";
import { Dispatcher } from "../../types/Dispatcher.type";

export interface NoteCreatorContext {
  from: Vector;
  toState: StateHook<Vector>;
  color: Color;
  max?: number;
  onNote: (note: Note) => void;
  setState: Dispatcher<NoteCreatorState>;
}

export interface NoteCreatorState {
  handleMove?(ctx: NoteCreatorContext, e: MouseEvent<SVG>): void;
  handleClick?(ctx: NoteCreatorContext, e: MouseEvent<SVG>): void;
  draw?(ctx: NoteCreatorContext): JSX.Element;
}
