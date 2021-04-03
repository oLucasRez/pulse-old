import { IColor } from "./IColor";
import { IVector } from "./IVector";

export interface IArrow {
  from: IVector;
  to: IVector;
  color: IColor;
}
