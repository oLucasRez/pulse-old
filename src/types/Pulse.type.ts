import { Color } from "./Color.type";
import { Vector } from "./Vector.type";

export interface Pulse {
  color: Color;
  origin: Vector;
  gap: number;
  amount: number;
}
