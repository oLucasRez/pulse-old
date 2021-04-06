import { Color } from "./Color.type";
import { Vector } from "./Vector.type";

export interface Arrow {
  color: Color;
  from: Vector;
  to: Vector;
}
