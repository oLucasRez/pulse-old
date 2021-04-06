import { Color } from "./Color.type";
import { Vector } from "./Vector.type";

export interface Dice {
  color: Color;
  origin?: Vector;
  sides: number;
  value: number;
}
