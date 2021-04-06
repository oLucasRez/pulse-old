import { Dispatcher } from "../../types/Dispatcher.type";
import { Color } from "../../types/Color.type";
import { Pulse } from "../../types/Pulse.type";
import { MouseEvent } from "react";
import { SVG } from "../../types/SVG.type";
import { Vector } from "../../types/Vector.type";
import { StateHook } from "../../types/StateHook.type";

export interface PulseCreatorContext {
  origin: Vector;
  gapState: StateHook<number>;
  addPulse: (pulse: Pulse) => void;
  amount: number;
  color: Color;
  onPulse: (pulse: Pulse) => void;
  setState: Dispatcher<PulseCreatorState>;
}

export interface PulseCreatorState {
  handleMove?(ctx: PulseCreatorContext, e: MouseEvent<SVG>): void;
  handleClick?(ctx: PulseCreatorContext, e: MouseEvent<SVG>): void;
  draw?(ctx: PulseCreatorContext): JSX.Element;
}
